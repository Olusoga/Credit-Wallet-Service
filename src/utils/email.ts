import nodemailer from "nodemailer";

export async function sendEmailVerification(email:string, token:any) {
          const transporter =nodemailer.createTransport({
            host:"smtp.mailtrap.io",
            port: 2525,
            secure: false, 
            auth: {   
                   user: process.env.MAIL_USERNAME, 
                   pass: process.env.MAIL_PASSWORD, 
            }
            })
           const url = `http://localhost:4040/api/v1`;
           await transporter.sendMail({
            from: '"Fred Foo 👻" <anshuraj@dosomecoding.com>', 
            to: `${email}`,
            subject: "Email verification", 
            html: `congratulations your account is successfully create click on link for verification <a href="${url}/verifymail/${token}/">Link</a>`, 
          });
          };