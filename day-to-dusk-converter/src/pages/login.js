import React, { useState } from 'react'
import Link from 'next/link'
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa'
import firebase, { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { redirect } from 'next/navigation';
import { useRouter } from "next/router"

export default function LoginPage() {

    const router = useRouter()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const res = await signInWithEmailAndPassword(auth, email, password)
        //   console.log('login')
          // Redirect or handle login success
          if(res.user){
            localStorage.setItem('auth_token',res.user.accessToken)
            router.replace("/")
          }
          console.log(res)
        } catch (error) {
            console.log('login', error)
          setError(error.message);
        }
      };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <h1 className="font-semibold text-2xl text-center text-gray-700">Logo</h1>
        <form className="mt-6" onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-2">
            <button onClick={handleLogin} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
