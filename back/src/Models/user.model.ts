import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../Interfaces/user.interface.js";


interface IUserModel extends Model<IUser> {
    // fetchUsers(): Promise<IUser[]>;
    fetchUserById(id: string): Promise<IUser | null>;
    createUser(username: string, email: string, password: string): Promise<IUser>;
    // deleteUserById(id: string): Promise<IUser | null>;
    // updateUserById(id: string, username: string, email: string, password: string): Promise<IUser | null>;
    checkCredentials(email: string, password: string): Promise<IUser | null>;
    getUserByEmail(email: string): Promise<IUser | null>;
    getUserByGoogleId(googleId: string): Promise<IUser | null>;
    addUser(user: IUser): Promise<IUser | null>;
}

const UserSchema: Schema = new Schema({
  
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    googleId: {type: String},
    fullName: {type:String},
    newAcc: {type:String},
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: function (doc, ret, options) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
                return ret;
            }
        }
    });

//virtuals
/*
PostSchema.virtual('id').get(function (this: IPost) {
    return this._id;
});
*/


class UserClass {
     

    static fetchUserById(this: IUserModel, id: string): Promise<IUser | null> {
        return this.findById(id);
    }

    static async createUser(this: IUserModel, username: string, email: string, password: string): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(password, 10);
        password = hashedPassword;
        return this.create({ username, email, password });
    }

    static async checkCredentials(this: IUserModel, email: string, password: string): Promise<IUser | null> {
        const user = await this.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        } else {
            return null;
        }
    }
    static async getUserByEmail(this: IUserModel, email: string): Promise<IUser | null> {
        return this.findOne({ email });

    }
    // static getUserByGoogleId = async (googleId: string): Promise<IUser | null> => {
    //     return this.findOne({ googleId });
    // }

    static async addUser(this: IUserModel, user: IUser): Promise<IUser | null> {
        return this.create(user);
    }
}

UserSchema.statics.getUserByGoogleId = async function (googleId: string): Promise<IUser | null> {
    return this.findOne({ googleId });
};
UserSchema.loadClass(UserClass);

const User = mongoose.model<IUser, IUserModel>('User', UserSchema);

export default User;