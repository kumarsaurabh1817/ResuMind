import {Request,Response,NextFunction} from 'express';
import jwt , {JwtPayload} from 'jsonwebtoken';
import User,{IUser} from '../models/user.js';

export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}

export const isAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction) : Promise<void> => {
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({ message: "Please Login - Authorization Header is required" });
            return;
        }

        const token = authHeader.split(" ")[1];
        if(!token) {
            res.status(401).json({ message: "Please Login - Authorization token is required" });
            return;
        }

        const decodedData = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        if(!decodedData || !decodedData._id) {
            res.status(401).json({ message: "Invalid authorization token" });
            return;
        }
        const user = await User.findById(decodedData._id);
        if(!user) {
            res.status(401).json({ message: "User not found" });
            return;
        }

        req.user = user;
        next();
    } catch (error:any) {
        console.error("Authentication error:", error.message);
        res.status(500).json({ message: "Invalid authorization token" });
    }
}

