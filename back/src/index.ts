import express from 'express';
import cors from 'cors'; // Import cors

// import { postController } from './Controllers/post.controller.js';
import { Request, Response, NextFunction } from 'express';
import connectDB from './db.js';
import Post from './Models/post.model.js';
import postRouter from './Routes/post.router.js';
import categoryRouter from './Routes/category.router.js';
import userRouter from './Routes/user.router.js';
import commentRouter from './Routes/comment.router.js';
import session from 'express-session';
// import initializePassport from './config/passposr-config.js';
import initializePassport from './config/passport.mw.js';
// import User from './Models/user.model.js';
// const cors = require('cors');


import passport from 'passport';
import { checkAuthenticated } from './middlewares/auth/auth.mw.js';

const app = express();

// Connect to MongoDB
connectDB();


// const postC = new postController();

app.use(session({
    secret: "secret",
    resave: false,
    //says if you wanna save an empty value in the session
    saveUninitialized: false,
    cookie: { secure: false }
}));
app.use(cors({origin: 'http://localhost:5173'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
// app.use(passport.authenticate('session'));

initializePassport(
    passport
    // User.getUserByEmail,
    // User.fetchUserById,
    // User.getUserByGoogleId,
    // User.addUser
);


app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/categories', categoryRouter);
app.use('/comments', commentRouter);

app.get('/dashboard', checkAuthenticated, (req, res) => {

    console.log('user ath ', req.user)
    res.send('User Authenticated')
})



app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));


app.get('/auth/google/callback',
    passport.authenticate('google', {
        // successRedirect: '/auth/protected',
        // successRedirect: '/dashboard',
        failureRedirect:
            '/auth/google/failure'
    }), (req, res) => {
        if (req.user) {


            res.status(200).json({ message: 'auth success', user: req.user });

        } else {
            res.status(401).json({ error: 'Google authentication failed' });
        }
    });

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send("route not found!");
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send("something Broke!");
});


const PORT = 8001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});