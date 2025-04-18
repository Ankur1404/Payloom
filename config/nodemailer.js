import nodemailer from 'nodemailer';
import { EMAIL_PASSWORD } from './env.js';


export const accountEmail = 'ankurkumarmr2@gmail.com';
 const mail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: accountEmail,
    pass: EMAIL_PASSWORD
  }
});

export default mail;