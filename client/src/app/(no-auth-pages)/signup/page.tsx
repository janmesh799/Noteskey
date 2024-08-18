"use client";
import SignUpForm from "@/components/SignUp/SignUpForm";
import SignUpImage from "@/components/SignUp/SignUpImage";
import withoutAuth from "@/hoc/withoutAuth";
import { useAppSelector } from "@/hooks/redux";
import { RootState } from "@/store";

function SignUp() {
  const colors = useAppSelector((state: RootState) => state.theme.colors);
  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gradient-to-br from-green-400 via-gray-200 to-white p-4">
      <div
        className={`flex flex-col md:flex-row w-full max-w-4xl h-auto md:h-[600px] ${colors.background} bg-opacity-75 rounded-2xl shadow-lg overflow-hidden`}
      >
        <SignUpImage />
        <SignUpForm />
      </div>
    </div>
  );
}

export default withoutAuth(SignUp);
