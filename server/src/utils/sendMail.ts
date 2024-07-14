import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

export type mailData = {
  to: string;
  subject: string;
  body: string;
};

const sendMail = (data: mailData) => {
  try {
    console.log(process.env);
    const senderEmail: string | undefined = process.env.SENDER_EMAIL;
    const senderPass: string | undefined = process.env.SENDER_PASS;
    if (!senderEmail || !senderPass) {
      if (!senderEmail) console.log("Sender email is not defined");
      if (!senderPass) console.log("Sender pass is not defined");
      throw new Error("Sending email failed");
    }
    // Create a nodemailer transporter with Gmail SMTP settings
    let mailTransporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: senderEmail, // Sender's email address[]
        pass: senderPass, // Sender's password
      },
    });

    // Define email details
    let mailDetails = {
      from: senderEmail, // Sender's email address
      to: data.to, // Receiver's email address
      subject: data.subject, // Email subject
      html: data.body, // HTML content of the email
    };

    // Send the email
    mailTransporter.sendMail(mailDetails, function (err: Error | null, info:SMTPTransport.SentMessageInfo) {
      if (err) {
        if (err instanceof Error) {
          console.error("Error occurred while sending email:", err.message);
          throw new Error(err.message);
        } else {
          console.error("Unknown error occurred while sending email:", err);
          throw new Error("Unknown error occurred while sending email");
        }
      } else {
        console.log("Email sent successfully");
        console.log("Response:", info.response);
      }
    });
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error occurred:", err.message);
      throw new Error(err.message);
    } else {
      console.error("An unknown error occurred:", err);
      throw new Error("An unknown error occurred");
    }
  }
};

export default sendMail;
