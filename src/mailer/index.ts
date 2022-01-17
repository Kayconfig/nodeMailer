import nodemailer from 'nodemailer';
import env from '../envConfig';
async function sendMail(to: string, subject: string, body: string) {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: env.USERNAME,
        clientId: env.CLIENTID,
        clientSecret: env.CLIENT_SECRET,
        refreshToken: env.REFRESH_TOKEN,
      },
    });
    let from = 'KAYTECH@noreply.com';
    let mailOptions = {
      from,
      to,
      subject,
      text: body,
    };

    const sentMsgInfo = await transporter.sendMail(mailOptions);
    return sentMsgInfo;
  } catch (error) {
    return { error };
  }
}

export default sendMail;
