// pages/register/page.tsx
"use client";
import { useState } from 'react';
import type { NextPage } from 'next';
import userRegister from '@/libs/userRegister';

const Register: NextPage = () => {
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Your registration logic here
  };

  const handleRegister = async()=>{
    const response = await userRegister(name,telephone,email,password,'user')
    setName('')
    setTelephone('')
    setEmail('')
    setConfirmEmail('')
    setPassword('')
    setConfirmPassword('')
    alert('Register Successfully')
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center mt-16">
  <p className='text-4xl mb-8 font-bold'>Register</p>

  <div className="w-full max-w-md">
    <div className="mb-4">
      <label htmlFor="name" className="block leading-7 text-sm text-gray-600 mb-2">
        Name
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-3 py-1 text-base border border-stone-800 bg-stone-100 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="telephone" className="block leading-7 text-sm text-gray-600 mb-2">
        Telephone
      </label>
      <input
        id="telephone"
        type="tel"
        value={telephone}
        onChange={(e) => setTelephone(e.target.value)}
        className="w-full px-3 py-1 text-base border border-stone-800 bg-stone-100 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="email" className="block leading-7 text-sm text-gray-600 mb-2">
        Email
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-1 text-base border border-stone-800 bg-stone-100 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="confirmEmail" className="block leading-7 text-sm text-gray-600 mb-2">
        Confirm Email
      </label>
      <input
        id="confirmEmail"
        type="email"
        value={confirmEmail}
        onChange={(e) => setConfirmEmail(e.target.value)}
        className="w-full px-3 py-1 text-base border border-stone-800 bg-stone-100 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
        required
      />
    </div>

    <div className="mb-4">
      <label htmlFor="password" className="block leading-7 text-sm text-gray-600 mb-2">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 py-1 text-base border border-stone-800 bg-stone-100 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
        required
      />
    </div>

    <div className="mb-6">
      <label htmlFor="confirmPassword" className="block leading-7 text-sm text-gray-600 mb-2">
        Confirm Password
      </label>
      <input
        id="confirmPassword"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="w-full px-3 py-1 text-base border border-stone-800 bg-stone-100 text-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500"
        required
      />
    </div>

    <button
      type="submit"
      className="w-full px-8 py-2 inline-block text-center bg-stone-100 text-stone-800 border border-stone-800 focus:outline-none focus:ring-2 focus:ring-stone-500 hover:bg-stone-800 hover:text-stone-100"
      onClick={handleRegister}
    >
      Register
    </button>
    {error && (
      <p className="mt-3 text-xs text-center text-red-500">{error}</p>
    )}
  </div>
</div>


  );
};

export default Register;
