import React from 'react';
import SignupForm from "./SignupForm"
import signUpImage from "../../assets/images/signup.png"

const Signup: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex max-w-4xl w-full bg-white">
        <div className="hidden md:block md:w-1/2 bg-cover">
          <img src={signUpImage} alt="Sign In" className="object-cover rounded-l-lg" />
        </div>
        <div className="w-full md:w-1/2 px-6 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign Up</h1>
          <SignupForm />
        </div>
      </div>
    </div>
  );
}
export default Signup;