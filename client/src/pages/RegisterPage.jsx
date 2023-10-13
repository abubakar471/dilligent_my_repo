import { SignUp } from "@clerk/clerk-react";

const RegisterPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignUp />
    </div>
  );
};

export default RegisterPage;
