"use client";
import LoginForm from "@/components/Login/LoginForm";
import LoginImage from "@/components/Login/LoginImage";
import withoutAuth from "@/hoc/withoutAuth";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";
import getColorWithOpacity from "@/utils/getColorWithOpacity";
import "./Login.css"; // Import the CSS file

function Login() {
  const colors = useAppSelector((state: RootState) => state.theme.colors);
  return (
    <div className="login-container">
      <div
        style={{ backgroundColor: getColorWithOpacity(colors.background,0.5) }}
        className={`login-box`}
      >
        <LoginImage />
        <LoginForm />
      </div>
    </div>
  );
}

export default withoutAuth(Login);
