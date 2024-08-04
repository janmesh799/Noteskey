import Notification from "../Model/Notification";
import User, { IUser } from "../Model/User";
export const createNotification = (
  user: IUser,
  title: string,
  content: string
) => {
  try {
    const notification = new Notification({
      title,
      content,
      user: user.id,
    });
    notification.save();
  } catch (err) {
    console.log(err);
  }
};
