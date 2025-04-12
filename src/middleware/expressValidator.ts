import { Response, Request, NextFunction } from "express"
import { validationResult } from "express-validator"
import { ERROR_CODES } from "../constants/app.constants"
import { logger } from ".."
import { sendResponse } from "../utils/handleResponse"

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    logger.error(errors.array())
    sendResponse(res,422, ERROR_CODES.FIELDS_ERROR.code, ERROR_CODES.FIELDS_ERROR.message, errors.array()); return;
}