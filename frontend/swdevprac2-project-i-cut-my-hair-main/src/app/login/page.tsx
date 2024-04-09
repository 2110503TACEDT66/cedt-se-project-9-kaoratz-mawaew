"use client";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import type { NextPage } from 'next';

const Login: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        window.location.href = '/'; // Modify this URL as needed
      }
    } catch (error) {
      // Handle error cases here1
      setError('Login failed');
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center mt-300">
      <p className='text-4xl mb-16 ml-7 text-left font-bold'>Login</p>

      <form onSubmit={handleFormSubmit} className="w-full max-w-xs">
        <div className="mb-4">
          <label htmlFor="email" className="leading-7 text-sm text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-1 text-base inline-block border p-2 text-left border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
            hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 text-stone-800 transform 
            hover:-translate-x-1 hover:-translate-y-1"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="leading-7 text-sm text-gray-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-1 text-base inline-block border p-2 text-left border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
            hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 text-stone-800 transform 
            hover:-translate-x-1 hover:-translate-y-1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-8 py-2 mt-4 inline-block border p-2 text-center border-stone-800 relative overflow-hidden transition-transform duration-300 ease-in-out 
          hover:shadow-lg hover:shadow-stone-500/100 bg-stone-100 hover:bg-stone-800 text-stone-800 hover:text-stone-100 transform 
          hover:-translate-x-1 hover:-translate-y-1"
        >
          Sign In
        </button>
        {error && (
          <p className="mt-3 text-xs text-center text-red-500">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
