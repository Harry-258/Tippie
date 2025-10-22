'use client';

import React, { useEffect, useState } from 'react';
import { doSignInWithEmailAndPassword, signInWithGoogle } from '@/firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/authContext';
import Link from 'next/link';
import { EyeClosedIcon, EyeIcon } from '@phosphor-icons/react';
import { iconSize } from '@/app/util/util';
import { FcGoogle } from 'react-icons/fc';

export default function Page() {
    // TODO: - Add Google login button

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
    const [loginFailed, setLoginFailed] = useState<boolean>(false);

    const { loggedIn } = useAuth();
    const router = useRouter();

    const inputClass = 'bg-foreground shadow-sm rounded-xl focus:outline-none';
    const labelClass = 'mb-2 text-sm font-medium text-primary/70';

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isLoggingIn) {
            setIsLoggingIn(true);
            doSignInWithEmailAndPassword(email, password)
                .then(() => {
                    router.push('/personal/dashboard');
                })
                .catch(err => {
                    console.error(err);
                    setLoginFailed(true);
                });
        }
    }

    async function loginWithGoogle(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isLoggingIn) {
            signInWithGoogle()
                .then(() => {
                    router.push('/personal/dashboard');
                })
                .catch(err => {
                    console.error(err);
                    setIsLoggingIn(false);
                });
        }
    }

    useEffect(() => {
        if (loggedIn) {
            router.push('/personal/dashboard');
        }
    });

    return (
        <div className="flex flex-col text-center items-center h-full">
            <span className="text-3xl font-semibold m-20">Tippie</span>

            <form onSubmit={submit} className="flex flex-col gap-6 w-full mb-10">
                <div className="flex flex-col text-left w-full">
                    <label htmlFor="email" className={labelClass}>
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className={`${inputClass} p-3`}
                    />
                </div>

                <div className="flex flex-col text-left w-full">
                    <label htmlFor="password" className={labelClass}>
                        Password
                    </label>
                    <div className={`${inputClass} relative`}>
                        <input
                            type={passwordVisible ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full p-3 rounded-xl focus:outline-none"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer justify-center text-gray-400 hover:text-primary/70">
                            {passwordVisible ? (
                                <EyeIcon
                                    size={iconSize}
                                    weight="bold"
                                    onClick={() => setPasswordVisible(false)}
                                />
                            ) : (
                                <EyeClosedIcon
                                    size={iconSize}
                                    weight="bold"
                                    onClick={() => setPasswordVisible(true)}
                                />
                            )}
                        </div>
                    </div>
                    <Link
                        href="/auth/reset-password"
                        className="font-medium hover:underline text-sm mt-3 text-primary/70 self-end"
                    >
                        Forgot your password?
                    </Link>
                </div>

                <button
                    className="mt-5 w-full p-5 rounded-xl shadow-md flex gap-2 items-center hover:bg-background-hover
                               justify-center bg-background transition-all duration-200 hover:cursor-pointer"
                    type="submit"
                >
                    Login
                </button>
            </form>

            <div className="flex flex-row w-full gap-2 items-center">
                <hr className="w-full border-primary/20" />
                <span className="text-primary/70 text-sm w-full">Or Login With</span>
                <hr className="w-full border-primary/20" />
            </div>

            <form
                onSubmit={loginWithGoogle}
                className="m-10 w-full rounded-xl shadow-md hover:bg-background-hover
                     bg-background transition-all duration-200 text-2xl"
            >
                <button
                    className="rounded-xl flex p-5 gap-2 items-center hover:cursor-pointer justify-center w-full h-full"
                    type="submit"
                >
                    <FcGoogle />
                    <span className="text-primary text-base">Login with Google</span>
                </button>
            </form>

            <span
                className={`${loginFailed ? 'text-red-500' : 'text-white'} text-sm h-fit transition duration-200 m-5`}
            >
                Username or password incorrect. Please try again.
            </span>

            <span className="text-sm text-primary/70 my-10 bottom-0 mt-auto">
                Don&#39;t have an account?&nbsp;
                <Link href="/auth/signup" className="text-primary/90 font-medium hover:underline">
                    Register now
                </Link>
            </span>
        </div>
    );
}
