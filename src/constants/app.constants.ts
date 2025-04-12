
export const appConstants = {
    MONGO_URI: process.env.MONGO_URI as string,
    DB_NAME: process.env.DB_NAME as string,
    JWT_SECRET: process.env.JWT_SECRET as string,
    JWT_EXPIRY: process.env.JWT_EXPIRY as string,
}


export const CUSTOM_CODES = {
    
    PATIENT_SCHEDULED_VACCINE_SUCCESS : {
        code: "PT101",
        message: "Fetch scheduled vaccinations successfully"
    },

    PATIENT_SCHEDULED_VACCINE_FAILURE : {
        code: "PT102",
        message: "Failed to fetch scheduled vaccinations"
    },
    
    PATIENT_COMPLETED_VACCINE_SUCCESS : {
        code: "PT201",
        message: "Fetch completed vaccinations successfully"
    },
    
    PATIENT_COMPLETED_VACCINE_FAILURE : {
        code: "PT202",
        message: "Failed to fetch completed vaccinations"
    },

        PATIENT_NOT_FOUND : {
            code: "PT301",
            message: "Patient not found"
        },
    LOGIN_SUCCESS: {
        code: "IN001",
        message: "Logged in successfully"
    },
    LOGIN_FAILED: {
        code: "IN002",
        message: "Failed to login"
    },

    REGISTER_SUCCESS: {
        code: "IN1002",
        message: "Registered successfully"
    },

    EXISTING_USER: {
        code: "IN4003",
        message: "User already exists, please login"
    },

    REGISTERN_FAILED: {
        code: "IN002",
        message: "Failed to register"
    },

    INVALID_CREDENTIALS: {
        code: "IN005",
        message: "Invalid credentials"
    },

    USER_NOT_EXISTS: {
        code: "IN004",
        message: "User not exists"
    },

    UNAUTHORIZED_ACCESS: { 
        code: "IN043", 
        message: "Unauthorized access" 
    },
    SUCCESS: {
        code: "IN2200",
        message: "OK"
    },

    DRUGS_FETCHED_SUCCESS: { 
        code: "DR001", 
        message: "Drugs fetched successfully" 
    }, 

    NO_DRUGS_FOUND: { 
        code: "DR002", 
        message: "No drugs found" 
    },

    DRUG_DETAILS_FETCHED_SUCCESS: { 
        code: "DR003", 
        message: "Drug details fetched successfully" 
    }, 

    DRUG_NOT_FOUND: { 
        code: "DR004", 
        message: "Drug not found" 
    }, 
     
}

export const ERROR_CODES = {
    SERVER_ERROR: {
        code: "IN4400",
        message: "server error, please try again"
    },
    UNAUTHORIZED: {
        code: "IN4401",
        message: "You are not authorized"
    },
    FORBIDDEN: {
        code: "IN4402",
        message: "You do not have permission"
    },
    BAD_REQUEST: {
        code: "IN4403",
        message: "Bad request, please try a different way"
    },
    NOT_FOUND: {
        code: "IN4404",
        message: "Not found"
    },
    INVALID_TOKEN: {
        code: "IN4405",
        message: "Token invalid"
    },

    EXPIRED_TOKEN: {
        code: "IN4406",
        message: "Token expired"
    },

    METHOD_ERROR: {
        code: "IN4407",
        message: "Method not allowed, please check the http method used"
    },

    DATABASE_ERROR: {
        code: "IN4408",
        message: "Something went wrong, please try again after sometime"

    },

    FIELDS_ERROR: {
        code: "IN4409",
        message: "Required fields are missing or incorrect type"
    },

    SUCCESS: {
        code: "IN2200",
        message: "OK"
    },
}