import UserRepository from '../repositories/user.repositories';
//import { UsersDTO } from '../interface/user';
import * as bcrypt from 'bcryptjs';
import { createVerificationToken } from '../helpers/createtoken';
import jwt from 'jsonwebtoken';
import axios from 'axios';
//import { sendEmailVerification } from '../utils/email';

class UserServices {
    public static async registerUser(data: any) {
        try {
            const email = data.email.toLowerCase();
    
            // // Check if the user is blacklisted
            // const blacklistUrl = `https://adjutor.lendsqr.com/v2/verification/karma/${email}`;
            // const blacklistResponse = await axios.get(blacklistUrl);
    
            // if (blacklistResponse.data.status === "success" && blacklistResponse.data.message === "Successful") {
            //     // User is blacklisted
            //     throw {
            //         status: 403,
            //         code: 'BLACKLISTED',
            //         message: 'User is blacklisted and cannot be onboarded'
            //     };
            // }
    
            const existingUsers = await UserRepository.getUsers(email);
    
            if (existingUsers.length > 0) {
                throw {
                    status: 400,
                    code: 'EMAIL_TAKEN',
                    message: 'Email already taken'
                };
            }
    
            const saltRounds = parseInt(process.env.SALT_ROUNDS as any);
            const hashedPassword = await bcrypt.hash(data.password, saltRounds);
            data.password = hashedPassword;
    
            const userData = {
                password: hashedPassword,
                email: data.email
            };
    
            const newUser = await UserRepository.createUser(userData);
    
            if (!newUser) {
                return {
                    status: 500,
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Something went wrong, please try again.'
                };
            }
    
            const token = createVerificationToken({ email: newUser.email, user_id: newUser.user_id });
            const authUserData = {
                email: newUser.email,
                password: newUser.password,
                token: token
            };
    
            // Optionally send an email verification
            // sendEmailVerification(email, token);
    
            return {
                status: 201,
                data: authUserData,
                message: 'User created successfully, a mail has been sent to you for email verification.'
            };
    
        } catch (error) {
            console.error('Error creating user:', error);
            return {
                status: error.status || 500,
                code: error.code || 'UNEXPECTED_ERROR',
                message: error.message || 'An unexpected error occurred'
            };
        }
    }
    

    public static async signIn(data: any) {
        const email = data.email.toLowerCase();
        const users = await UserRepository.getUsers(email);

        if (users.length === 0)
            throw { status: 400, code: 'EMAIL_NOT_EXIST', message: 'user account does not exist, please register' };
        const isValidPassword = await bcrypt.compare(data.password, users[0].password);
        if (!isValidPassword) {
            throw { status: 400, code: 'BAD_REQUEST', message: 'Incorrect password.' };
        } else {
            const token = jwt.sign(
                { user_id: users[0].user_id.toString(), email: users[0].email },
                process.env.JWT_SECRET as any,
                { expiresIn: 8640000 }
            );
            const authUserData = {
                user_id: users[0].user_id,
                email: users[0].email,
                token: token
            };
            return {
                status: 200,
                data: authUserData,
                message: 'User login successfully.'
            };
        }
    }

    public static async getUserById(user_id: string) {
        const user = await UserRepository.getUserById(user_id);
        if (user.length === 0) throw new Error('User not found')
        return user;
    }
}
export default UserServices;
