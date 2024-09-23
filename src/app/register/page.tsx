'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import React,{useState} from "react";

const Register = () => {
    const [error, setError] = React.useState("")
    const router = useRouter();
    const isValidEmail = (email: string) => {
        const eamilRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
        return eamilRegex.test(email);
    }
    const handleSubmit = async(e: any) => {
        e.preventDefault()
        const email = e.target[0].value 
        const password = e.target[1].value

        if(!isValidEmail(email)) {
            setError("Invalid Email")
            return;
        }

        if(!password || password.trim().length < 8) {
            setError("Short password")
            return;
        }

        try {
            const res = await fetch("/api/register", {
                method: "POST",
                headers: {
                    'Content-Type':"application/json"
                },
                body: JSON.stringify({
                    email,
                    password
                })
        })
        if(res.status === 400) {
            setError("This email already registered")
        }if(res.status === 200) {
            setError("");
            router.push("/login")
        }
        } catch (error) {
            setError("Something went wrong")
            console.log(error)
        }

       }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="bg-[#212121] p-8 rounded shadow-md w-96">
        <h1 className="text-4xl text-center font-semibold mb-8">Register</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="email"
            className="w-full border border-gray-300 text-black px-3 py-2 focus:outline-none  mb-4 p-2 focus:text-black rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 text-black px-3 py-2 focus:outline-none  mb-4 p-2 focus:text-black rounded"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600" >Register</button>
        <p className="text-red-500 text[16px] mt-4">{error && error}</p>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link href={'/login'} className="block text-center text-blue-500 hover:underline mt-2">Login with un existing account</Link>
      </div>
    </div>
  );
};

export default Register;
