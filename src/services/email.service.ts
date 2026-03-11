/**
 * Sends email
 * @param {Array<string>} recipients
 * @param {string} subject
 * @param {string} template
 * @param {Array<string>} ccRecipients
 */
import nodemailer from 'nodemailer';

import { NODE_ENV } from '@/config';

const REDIRECT_EMAIL =
  process.env.REDIRECT_EMAIL || 'sahilpreet.singh@tickmark.io';
const EMAIL_USER = process.env.EMAIL_USER || 'your-default@email.com';
const EMAIL_PASS = process.env.EMAIL_PASS || 'your-default-password';

export const sendEmail = async (
  recipients: string[],
  subject: string,
  template: string,
  ccRecipients: string[],
) => {
  let destinationEmail: string[] = [];
  let ccDestinationEmail: string[] = [];

  if (NODE_ENV === 'production') {
    destinationEmail = recipients;
    ccDestinationEmail = ccRecipients;
  } else {
    if (!REDIRECT_EMAIL) {
      throw new Error(
        'REDIRECT_EMAIL is not defined for ' + NODE_ENV + ' environment.',
      );
    }
    destinationEmail = [REDIRECT_EMAIL];
    ccDestinationEmail = [REDIRECT_EMAIL];
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"ShivShaktiFoodDelivery" <${EMAIL_USER}>`,
    to: destinationEmail,
    cc: ccDestinationEmail,
    subject: subject,
    html: template,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
};
