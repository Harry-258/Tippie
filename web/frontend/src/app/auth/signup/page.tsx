'use client';

import React, {useState} from "react";
import {doCreateUserWithEmailAndPassword} from "@/firebase/auth";
import {useRouter} from "next/navigation";
import {EyeClosedIcon, EyeIcon} from "@phosphor-icons/react";
import {iconSize} from "@/app/util/util";
import Link from "next/link";

export default function Signup() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const [passwordConfirmVisible, setPasswordConfirmVisible] = useState<boolean>(false);
    const [signupFailed, setSignupFailed] = useState<boolean>(false);
    const [signupFailedMessage, setSignupFailedMessage] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    const inputClass = "bg-foreground shadow-sm rounded-xl focus:outline-none";
    const labelClass = "mb-2 text-sm font-medium text-primary/70";

    const router = useRouter();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // TODO: input validation
        if (password !== passwordConfirm) {
            setSignupFailedMessage("Passwords do not match!");
            setSignupFailed(true);
        } else if (!isRegistering) {
            setIsRegistering(true);
            await doCreateUserWithEmailAndPassword(email, password).then(() => {
                // Apparently you are already logged in?
                router.push("/personal/dashboard");
            }).catch((err) => {
                console.log(err);
                setSignupFailed(true);
                setSignupFailedMessage("Something went wrong. Please try again.");
                setIsRegistering(false);
            })
        }
    }

    return (
        <div className="flex flex-col text-center items-center justify-between h-full">
            <span className="text-3xl font-semibold m-20">Tippie</span>

            <form onSubmit={submit} className="flex flex-col gap-6 w-full mb-10">
                <div className="flex flex-col text-left w-full">
                    <label
                        htmlFor="email"
                        className={labelClass}
                    >
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className={`${inputClass} p-3`}
                    />
                </div>

                <div className="flex flex-col text-left w-full">
                    <label
                        htmlFor="password"
                        className={labelClass}
                    >
                        Password
                    </label>
                    <div className={`${inputClass} relative`}>
                        <input
                            type={passwordVisible ? "text" : "password"}
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full p-3 rounded-xl focus:outline-none"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer justify-center text-gray-400 hover:text-primary/70">
                            {passwordVisible
                                ? (<EyeIcon
                                    size={iconSize}
                                    weight="bold"
                                    onClick={() => setPasswordVisible(false)}
                                />)
                                : (<EyeClosedIcon
                                    size={iconSize}
                                    weight="bold"
                                    onClick={() => setPasswordVisible(true)}
                                />)
                            }
                        </div>
                    </div>
                </div>

                <div className="flex flex-col text-left w-full">
                    <label
                        htmlFor="passwordConfirm"
                        className={labelClass}
                    >
                        Confirm Password
                    </label>
                    <div className={`${inputClass} relative`}>
                        <input
                            type={passwordConfirmVisible ? "text" : "password"}
                            id="passwordConfirm"
                            name="passwordConfirm"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            placeholder="Confirm your password"
                            className="w-full p-3 rounded-xl focus:outline-none"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 hover:cursor-pointer justify-center text-gray-400 hover:text-primary/70">
                            {passwordConfirmVisible
                                ? (<EyeIcon
                                    size={iconSize}
                                    weight="bold"
                                    onClick={() => setPasswordConfirmVisible(false)}
                                />)
                                : (<EyeClosedIcon
                                    size={iconSize}
                                    weight="bold"
                                    onClick={() => setPasswordConfirmVisible(true)}
                                />)
                            }
                        </div>
                    </div>
                </div>

                <button
                    className="mt-10 w-full p-5 rounded-xl shadow-md flex gap-2 items-center hover:bg-background-hover
                               justify-center bg-background transition-all duration-200 hover:cursor-pointer"
                    type="submit"
                >
                    Create Account
                </button>
            </form>

            <span className={`${signupFailed ? "text-red-500" : "text-white"} text-sm h-fit transition duration-200 my-5`}>
                {signupFailedMessage}
            </span>

            <span className="text-sm text-primary/70 my-10 bottom-0 mt-auto">
                Already have an account?&nbsp;
                <Link
                    href="/auth/login"
                    className="text-primary/90 font-medium hover:underline"
                >
                    Log in now
                </Link>
            </span>
        </div>
    )
}