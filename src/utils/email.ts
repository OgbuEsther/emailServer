import nodemailer from "nodemailer";
import { google } from "googleapis";

const client_Secret = "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";

const client_Id =
  "738863812480-p619ajfm1v72rnr9698rth6spmns40pi.apps.googleusercontent.com";
const refresh_Token =
  "1//04jdr7MgZ2zTRCgYIARAAGAQSNwF-L9IrMHGrGZKvFfiAWDzuc9HWRs0GR9byxlNRM3xLHK8uSc69XMr48rrXCBVaJNx70SRvNww";
const redirect = "https://developers.google.com/oauthplayground/";

const OAuth = new google.auth.OAuth2(client_Id, client_Secret, redirect);
OAuth.setCredentials({ refresh_token: refresh_Token }); 



export const emailEnv = async (newUser: any) => {
  try {
    const access_token = await OAuth.getAccessToken();
    OAuth.setCredentials({ access_token: refresh_Token }); 
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "techicon19@gmail.com",
        
        refreshToken: refresh_Token,
        clientId: client_Id,
        clientSecret: client_Secret,
        accessToken: access_token.token || "",
      },
    });

    const mailOptions = {
      from: "Easy Pay ❤💵💳 <>",
      //   to: "ogbuuzoma413@gmail.com",
      to: newUser.email,
      subject: "verify your account",
      html: `<h2>view your login details below</h2>`,
    };
    transporter.sendMail(mailOptions).then((res)=>{
console.log(`email sent`)
    }).catch((err)=>{
        console.log(`couldn't send mail ${err}`)
    })
  } catch (error) {
    return error;
  }
};
