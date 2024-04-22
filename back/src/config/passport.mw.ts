if (process.env.NODE_ENV !== 'production') {
    import('dotenv').then((dotenv) => dotenv.config());
}
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";
import { IUser } from "../Interfaces/user.interface.js";
import User from "../Models/user.model.js";
import { DoneCallback } from "passport";



// type PassportInstance = typeof passport;

async function initialize(passport: any
    // , getUserByEmail: (email: string) => Promise<IUser | null>, getUserById: (id: string) => Promise<IUser | null>, getUserByGoogleId: (id: string) => Promise<IUser | null>, addUser: (user: IUser) => Promise<IUser | null>
) {
    const authenticateUser = async (email: string, password: string, done: any
        //  done: (error: any, user?: any, options?: { message: string }) => void
    ) => {
        // console.log('dd md', email, password)

        const user = await User.getUserByEmail(email);
        console.log('user found ', user);
        // console.log('get user by email func', user)
        if (user == null) {
            return done(null, false
                // , { message: "No user with that username" }
            );
        }

        try {
            if (await bcrypt.compare(password, user.password!)) {
                return done(null, user);
            } else {
                return done(null, false
                    // , { message: "Password incorrect" }
                );
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));


    //Google Strategy
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID!,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
                callbackURL: process.env.GOOGLE_CALLBACK_URL,
                passReqToCallback: true,
                scope: ["email", "profile"],
            },
            async function (request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
                const existingGoogleUser = await User.getUserByGoogleId(profile.id);

                console.log('start google auth')
                if (existingGoogleUser) {
                    console.log('google auth found')

                    return done(null, existingGoogleUser);
                } else {
                    console.log('google auth  not found')

                    const newGoogleUser = new User({
                        // id: profile.id,
                        googleId: profile.id,
                        fullName: profile.displayName,
                        username: "Googlee User",
                        email: profile.emails[0].value,
                        password: process.env.DEFAULT_PASSWORD
                        // dateJoined: new Date()
                    });

                    
                     // Set custom property isNewUser to true
                    //  request.session.isNewUser = true;
                    console.log('newGoogleUser to save ', newGoogleUser)

                    newGoogleUser.save();

                    // users.push(newGoogleUser);

                    // request.session.isNewUser = true;
                    return done(null, newGoogleUser);
                }
            }
        )
    );

    passport.serializeUser((user: IUser, done:DoneCallback) => done(null, user.id));

    passport.deserializeUser((id: string, done: DoneCallback) => {
        const user = User.fetchUserById(id);
        done(null, user);
    });
}

export default initialize;