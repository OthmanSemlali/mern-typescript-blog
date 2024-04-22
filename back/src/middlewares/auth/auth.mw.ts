import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import { IUser } from '../../Interfaces/user.interface.js';

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {

    // console.log('first', req.body)
    passport.authenticate('local', (err: Error | null, user: IUser | false, info: any) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred during authentication' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'An error occurred during login' });
            }
            // next();
            return res.status(200).json({ message: 'Login successful', user: user });
        });
    })(req, res, next);
};


export const  checkNotAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if(req.isAuthenticated()){

        return res.json({error: "Unautorized (you must be logged out to perform such an operation)"})
    }
    next();
}

export const checkAuthenticated = (req:Request, res:Response, next:NextFunction) => {
    if(req.isAuthenticated()){
        return next();
    }
    
    res.sendStatus(401)
}