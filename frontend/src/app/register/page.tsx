// pages/register/page.tsx
"use client";
import { useState } from 'react';
// import type { NextPage } from 'next';
import { useRouter } from 'next/navigation';
import userRegister from '@/libs/userRegister';
import toast, { Toaster } from 'react-hot-toast';
const Register = () => {
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const logginToast = toast.loading('Registering.', {
      style: {
        padding: '10px 40px',
        color: '#EDEDED',
        backgroundColor: '#1B1B1B',
        borderRadius: '4px',

      },
      iconTheme: {
        primary: '#1B1B1B',
        secondary: '#EDEDED',
      },

    });

    if (email != confirmEmail) {
      setError("Email doesn't match");
      return;
    }
    if (password != confirmPassword) {
      setError("Password doesn't match");
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const response = await userRegister(name, telephone, email, password);

    if (!response.success) {
      toast.dismiss(logginToast);
      const failToast = toast.error('Register failed', {
        style: {
          padding: '10px 60px',
          color: '#EDEDED',
          backgroundColor: '#1B1B1B',
          borderRadius: '4px',
        },
        iconTheme: {
          primary: '#383838',
          secondary: '#EDEDED',
        },
        duration: 1000,

      });
      return
    }
    
    toast.dismiss(logginToast);
    handleRegister();
  };

  const handleRegister = async () => {

    setName('')
    setTelephone('')
    setEmail('')
    setConfirmEmail('')
    setPassword('')
    setConfirmPassword('')

    toast.success('Register success, redirecting...', {
      style: {
        padding: '10px 60px',
        color: '#EDEDED',
        backgroundColor: '#1B1B1B',
        borderRadius: '4px',
        maxWidth: 500
      },
      iconTheme: {
        primary: '#383838',
        secondary: '#EDEDED',
      },
      duration: 1000,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    router.push('/login')

  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center mt-16">
      <Toaster />
      <p className='text-4xl mb-8 font-bold'>Register</p>

      <div className="w-full max-w-md">
        <form onSubmit={handleFormSubmit}>
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
          //onClick={handleRegister}
          >
            Register
          </button>
        </form>

        {error && (
          <p className="mt-3 text-xs text-center text-red-500">{error}</p>
        )}
      </div>
    </div>


  );
};

export default Register;
