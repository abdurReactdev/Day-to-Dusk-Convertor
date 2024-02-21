import React, { useState } from 'react'
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { Spinner } from "@material-tailwind/react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      //   console.log('login')
      // Redirect or handle login success
      if (res.user) {
        localStorage.setItem("auth_token", res.user.accessToken);
        localStorage.setItem("userDetails", JSON.stringify(res.user));
        router.replace("/");
      } else {
        alert("Something went wrong please try again");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="sm:shadow-xl px-8 pb-8 pt-12 sm:bg-white rounded-xl space-y-12">
        <div className="font-bold text-lg sm:text-xl text-center">
          <span className="text-gray-900">Virtual Staging</span>&nbsp;
          <span className="text-blue-600">AI</span>
        </div>
        <form className="!mt-3" onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
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
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
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
          <div className="mt-4">
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-[#2662eb] rounded-md focus:outline-none flex justify-center"
            >
              {loading ? <Spinner /> : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
