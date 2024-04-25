"use client";
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import getUserProfile from '@/libs/getUserProfile';
import toast, { Toaster } from 'react-hot-toast';


const Login = () => {

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('');

  const { data: session } = useSession();

  const getProfile = async (token: string) => {
    const profile = await getUserProfile(token);
    setRole(profile.data.role)
  }


  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const logginToast = toast.loading('Logging you in.', {
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


      const result = await signIn('credentials', {
        redirect: false,
        callbackUrl: '/dashboard',
        email,
        password,
      }
      );

      // make a delay here 2 sec
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (result?.ok) {
        toast.dismiss(logginToast);
        toast.success('Login success, redirecting...', {
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
          duration: 2000,
        });

        await new Promise((resolve) => setTimeout(resolve, 1000));

        router.push('/dashboard')
        router.refresh();
        
      } else {
        toast.dismiss(logginToast);
        const failToast = toast.error('Login failed', {
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

        });
      }


    } catch (error) {
      // Handle error cases here1
      setError('Login failed');
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center mt-300">
      <Toaster />
      {/* <p className='text-4xl mb-16 ml-7 text-left font-bold'>hello</p> */}
      <form onSubmit={handleFormSubmit} className="w-full max-w-xs space-y-4">
        <div className="space-y-3">
          <label htmlFor="email" className="leading-7 text-gray-600 font-mono text-xl">
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
        <div className="space-y-3">
          <label htmlFor="password" className="leading-7 text-xl text-gray-600 font-mono">
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
          hover:-translate-x-1 hover:-translate-y-1 font-mono " style={{ fontSize: "20px" }}
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

// const login = (role: string) => {
//   if (role == 'manager' || role == 'admin') {
//     redirect('/dashboard')
//   }

//   if (role == 'user') {
//     redirect('/restaurant')
//   }
// }