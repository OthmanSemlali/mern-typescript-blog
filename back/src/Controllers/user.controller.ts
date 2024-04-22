import User from "../Models/user.model.js";

import { Request, Response } from 'express';
import { validationResult } from 'express-validator';


class UserController {

    public async fetchUserById(req: Request, res: Response) {
        const _id = req.params.id;

        try {
            const user = await User.fetchUserById(_id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });

        }
    }
    public async createUser(req: Request, res: Response) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log('errors: ', errors);
            return res.status(400).json({ errors: errors.array() });
        }

        console.log('req.body', req.body);

        const { username, email, password, role } = req.body;

        const user = await User.getUserByEmail(email);
        if(user){
            return res.status(400).json({ errors: [{"type":"field","value":email, "msg":"Email Already Exist","path":"email"}] });
        }

        try {
            const user = await User.createUser(username, email, password);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });
        }
    }

    //check credentials
    public async checkCredentials(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await User.checkCredentials(email, password);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: 'Server Error' });

        }
    }

    

}

export default new UserController();