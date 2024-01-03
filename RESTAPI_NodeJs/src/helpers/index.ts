import crypto from 'crypto';

const SECRERT = 'Idris-Vohra';

export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt: string,password:string)=> {
    return crypto.createHmac('sha256',[salt,password].join('/')).update(SECRERT).digest('hex');
};
