'use client'

import { CookieHelper } from "@/helper/cookie.helper";
import { UserService } from "@/userservice/user.service";
import Link from "next/link";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { IoEyeOffOutline } from "react-icons/io5";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function page() {
    const [showPass, setShowPass] = useState<boolean>(false);
    const router = useRouter();
    const { handleSubmit, register, formState: { errors } } = useForm<{ email: string; pass: string }>();
    const [loading,setLoading] = useState(false);
    const OnSubmit = async (data: { email: string; pass: string }) => {
        setLoading(true);
        try{
            const res = await UserService?.login({email:data?.email,password:data?.pass});
            if(res?.data?.success){
                CookieHelper?.set({
                    key: "access_token",
                    value: res?.data?.authorization?.access_token
                })
                toast.success("Login successful.");
                setTimeout(() => {
                    router?.replace('/');
                }, 1000);
            }
        }catch(err:any){
            console.log(err);
            toast.error(err?.response?.data?.message?.message)
        }finally{
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <Toaster position="top-right" />
            <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-lg p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
                    <p className="text-gray-600">Sign in to your account</p>
                </div>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit(OnSubmit)}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>
                        <div>
                            <input
                                id="email"
                                type="email"
                                {...register('email', { required: "Enter email address" })}
                                className="w-full px-4 py-3 border outline-none border-gray-300 rounded-lg transition-colors"
                                placeholder="Enter your email"
                            />
                        </div>
                        <span className="text-red-500 text-sm">{errors?.email?.message}</span>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div>
                            <div className="relative border border-gray-300 rounded-lg flex items-center pr-3">
                                <input
                                    id="password"
                                    type={showPass ? "text" : "password"}
                                    {...register('pass', { required: "Enter your password" })}
                                    autoComplete="off"
                                    className="w-full px-4 py-3 outline-none transition-colors"
                                    placeholder="Enter your password"
                                />
                                <div className="flex items-center text-xl cursor-pointer" onClick={()=>setShowPass(prev => !prev)}>
                                    {showPass ?
                                        <IoEyeOutline />
                                        :
                                        <IoEyeOffOutline />
                                    }
                                </div>
                            </div>
                            <span className="text-red-500 text-sm">{errors?.pass?.message}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <Link
                            href="/forgotpassword"
                            className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
                        >
                            Forget password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-[#DE3526] hover:bg-[#be2e21] duration-300 text-white font-semibold py-3 px-4 rounded-lg transition-colors ${loading?"cursor-not-allowed opacity-50":"cursor-pointer"}`}
                    >
                        {loading?"Loading...":"Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}