import axios from "axios";
import { oauth2Client } from "../config/googleConfig.js";
import { AuthenticatedRequest } from "../middlewares/isAuth.js";
import TryCatch from "../middlewares/trycatch.js";
import User from "../models/user.js";
import  jwt from "jsonwebtoken";

export const loginUser = TryCatch(async (req, res) => {
    const { code} = req.body;

    if(!code) {
        return res.status(400).json({ message: "Authorization code is required" });
    }

    const googleResponse = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleResponse.tokens);

    const userResponse = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleResponse.tokens.access_token}`);

    const { name, email, picture } = userResponse.data;

    let user = await User.findOne({email: email});

    if(!user) {
        user = await User.create({
            name,
            email,
            image: picture
        });
    } 

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET as string, { expiresIn: "15d" });
    res.json({message : "User Login successful", token , user});

}); 
export const myProfile = TryCatch(async (req: AuthenticatedRequest, res) => {
    const user = req.user;
    res.json({ message: "Profile fetched successfully", user });
});