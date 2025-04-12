class AppError extends Error{
    public httpCode: number;
    public statusCode: string;
    public isOperational: boolean;

    constructor(httpCode: number, statusCode: string, message: string, isOperational = true) {
        super(message);
        this.httpCode = httpCode;
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default AppError;