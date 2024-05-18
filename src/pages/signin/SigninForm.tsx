import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../../config/constants';
import { useAuth } from '../../context/AuthContext';

const SigninForm: React.FC = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign-in failed');
      }

      console.log('Sign-in successful');
      
      // extract the response body as JSON data
      const data = await response.json();

      // After successful signin, first we will save the token in localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      console.log(data.token);
      signIn(data.user);
      navigate("/dashboard");

    } catch (error) {
      console.error('Sign-in failed:', error);
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border border-blue-200 rounded-md shadow-md">
      <div>
        <label className="block text-blue-700 font-semibold mb-2">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-blue-300 rounded-md py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:border-light-blue-500 focus:shadow-outline-light-blue"
        />
      </div>
      <div>
        <label className="block text-blue-700 font-semibold mb-2">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-blue-300 rounded-md py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:border-light-blue-500 focus:shadow-outline-light-blue"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue mt-4"
      >
        Sign In
      </button>
      <div className="mt-4 text-center">
        <p>New User?</p>
        <button
          type="button"
          onClick={handleSignupClick}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue mt-2"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};

export default SigninForm;