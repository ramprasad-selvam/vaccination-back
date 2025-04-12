import bcrypt from "bcryptjs";
import { User } from "../models/userModel";
import { RegisterUserParams } from "../interfaces/interface";
import { CUSTOM_CODES } from "../constants/app.constants";
import AppError from "../utils/AppError";
import { generateToken } from "../utils/generateToken";

/**
 * @param data of type RegisterUserParams
 * @returns An object containing a success message and the user's name
 */
export const userRegister = async (data: RegisterUserParams) => {

        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw new AppError(404, CUSTOM_CODES.EXISTING_USER.code, CUSTOM_CODES.EXISTING_USER.message);
        }

        const hashedpassword = await bcrypt.hash(data.password, 10);
        const user = await User.create({
            name: data.name,
            email: data.email.toLowerCase(),
            phoneNumber: data.phoneNumber,
            password: hashedpassword,
            age: data.age,
            gender: data.gender,
            role: data.role
        });

        if(!user){
           throw new AppError(400, CUSTOM_CODES.REGISTERN_FAILED.code, CUSTOM_CODES.REGISTERN_FAILED.message)
        }
        return user;
}

/**
 * @param email - User's email address
 * @param password - User's password
 * @returns An object containing a success message, user details, and the token
 */
export const userLogin = async (email: string, password: string) => {
    const formattedEmail = email.toLowerCase();
    const user = await User.findOne({ email : formattedEmail });
    if (!user) {
        throw new AppError(400,CUSTOM_CODES.USER_NOT_EXISTS.code,CUSTOM_CODES.USER_NOT_EXISTS.message);
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new AppError(400,CUSTOM_CODES.INVALID_CREDENTIALS.code,CUSTOM_CODES.INVALID_CREDENTIALS.message);
    }

    const token = generateToken(user._id, user.role);

    return {
        name: user.name,
        role:user.role,
        token: token
    };
}