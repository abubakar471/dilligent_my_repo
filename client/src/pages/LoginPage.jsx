import { SignIn } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignIn />
    </div>
  );
};

export default LoginPage;
