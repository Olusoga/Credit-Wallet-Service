import jwt from 'jsonwebtoken'
export function createVerificationToken(payload:any){
return jwt.sign(payload, process.env.JWT_SECRET as any, {expiresIn:"20m"})
}
      