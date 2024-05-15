import React from 'react';
import SigninForm from "./SigninForm"
import signInImage from "../../assets/images/signin.png"

const Signup: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="flex max-w-4xl w-full bg-white">
        <div className="hidden md:block md:w-1/2 bg-cover">
          <img src={signInImage} alt="Sign In" className="object-cover rounded-l-lg" />
        </div>
        <div className="w-full md:w-1/2 px-6 py-8">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Sign In</h1>
          <SigninForm />
        </div>
      </div>
    </div>
  );
}
export default Signup;