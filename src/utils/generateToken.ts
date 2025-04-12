import jwt from "jsonwebtoken";
import { env_config } from "../config/environment";

/**
 * @param id 
 * @param role 
 * @returns a token containing object id assigned and role assignes
 */
export const generateToken = ( id : string, role : string ) => {
    return jwt.sign({ id, role }, env_config.jwtSecret as string , {expiresIn : "1d"})
}
