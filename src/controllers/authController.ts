import { NextFunction, Request, Response } from "express";

import { sendResponse } from "../utils/handleResponse";
import { CUSTOM_CODES } from "../constants/app.constants";
import { logger } from "..";
import { userLogin, userRegister } from "../service/authService";


/**
 * @param req - Express request object
 * @param res - Express response object
*/
export const Login_User = async (req: Request, res: Response, next : NextFunction): Promise<void> => {
	try {
		const { email, password } = req.body;
		const response = await userLogin(email, password);

		logger.info(CUSTOM_CODES.LOGIN_SUCCESS.code)
		sendResponse(res, 200, CUSTOM_CODES.LOGIN_SUCCESS.code, CUSTOM_CODES.LOGIN_SUCCESS.message, null, response )
	} catch (error : unknown) {
		logger.error(error);
		next(error)
	}
}


/**
 * @param req - Express request object
 * @param res - Express response object
 */
export const Register_User = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
	try {
		const data = req.body;
		const response = await userRegister(data);
		logger.info(CUSTOM_CODES.REGISTER_SUCCESS.code);
		if (response) {
			sendResponse(res, 201, CUSTOM_CODES.REGISTER_SUCCESS.code, CUSTOM_CODES.REGISTER_SUCCESS.message, null)
		}
	} catch (error: unknown ) {
		logger.error(error)
		next(error)
	}
}