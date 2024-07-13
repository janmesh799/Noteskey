import { IUser } from "../Model/User";
import { INote } from "../Model/Note";
import sendMail from "./sendMail";

const generateSharedNoteEmail = (
  fromUser: IUser,
  toUser: IUser,
  sharedNote: INote,
  frontendUrl: string
) => {
  try {
    let emailSubject = `${fromUser.name} shared a note with you with the title '${sharedNote.title}'.`;

    let noteLink = `${frontendUrl}/notes/${sharedNote.id}`;

    let htmlData = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Note Shared with You</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                  -webkit-font-smoothing: antialiased;
              }
              .email-container {
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
              .email-header {
                  text-align: center;
                  padding-bottom: 20px;
                  border-bottom: 1px solid #dddddd;
              }
              .email-header h1 {
                  margin: 0;
                  color: #333333;
              }
              .email-body {
                  padding: 20px 0;
                  text-align: center;
              }
              .email-body p {
                  color: #666666;
                  line-height: 1.6;
              }
              .email-body .button {
                  display: inline-block;
                  padding: 10px 20px;
                  margin-top: 20px;
                  background-color: #007bff;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  font-weight: bold;
              }
              .email-footer {
                  text-align: center;
                  padding-top: 20px;
                  border-top: 1px solid #dddddd;
                  color: #999999;
              }
              .email-footer p {
                  margin: 0;
              }
          </style>
      </head>
      <body>
          <div class="email-container">
              <div class="email-header">
                  <h1>Note Shared with You</h1>
              </div>
              <div class="email-body">
                  <p><strong>${fromUser.name}</strong> has shared a note with you with the title:</p>
                  <p><strong>${sharedNote.title}</strong></p>
                  <p>Have a look by clicking the button below or the link below:</p>
                  <a href="${noteLink}" class="button">View Note</a>
                  <p><a href="${noteLink}">${noteLink}</a></p>
              </div>
              <div class="email-footer">
                  <p>&copy; 2024 PlannerPulse. All rights reserved.</p>
              </div>
          </div>
      </body>
      </html>
    `;

    sendMail({ to: toUser.email, subject: emailSubject, body: htmlData });
    return;
  } catch (err: unknown) {
    // Explicitly typing 'err' as 'unknown'
    if (err instanceof Error) {
      console.log(`Can't generate Shared Note Email because ${err.message}`);
      throw new Error(err.message);
    } else {
      console.log(`Unknown error occurred: ${err}`);
      throw new Error("Unknown error occurred");
    }
  }
};

export default generateSharedNoteEmail;
