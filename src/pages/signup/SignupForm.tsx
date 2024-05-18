import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINT } from '../../config/constants';
import { useAuth } from '../../context/AuthContext';

const SignupForm: React.FC = () => {
  const { signIn } = useAuth();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, email: userEmail, password: userPassword }),
      });

      if (!response.ok) {
        throw new Error('Sign-up failed');
      }
      console.log('Sign-up successful');
      const data = await response.json();

      localStorage.setItem('authToken', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      signIn(data.user);
      navigate("/dashboard");
      
      // Dialogue: After successful signup we have to redirect the user to the secured page. We will do that later.
    } catch (error) {
      console.error('Sign-up failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-4 border border-blue-200 rounded-md shadow-md">
      <div>
        <label className="block text-blue-700 font-semibold mb-2">Your Name:</label>
        <input
          type="text"
          name="userName"
          id="userName"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full border border-blue-300 rounded-md py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:border-light-blue-500 focus:shadow-outline-light-blue"
        />
      </div>
      <div>
        <label className="block text-blue-700 font-semibold mb-2">Email:</label>
        <input
          type="email"
          name="userEmail"
          id="userEmail"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className="w-full border border-blue-300 rounded-md py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:border-light-blue-500 focus:shadow-outline-light-blue"
        />
      </div>
      <div>
        <label className="block text-blue-700 font-semibold mb-2">Password:</label>
        <input
          type="password"
          name="userPassword"
          id="userPassword"
          value={userPassword}
          onChange={(e) => setUserPassword(e.target.value)}
          className="w-full border border-blue-300 rounded-md py-2 px-3 text-blue-700 leading-tight focus:outline-none focus:border-light-blue-500 focus:shadow-outline-light-blue"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue mt-4"
      >
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;