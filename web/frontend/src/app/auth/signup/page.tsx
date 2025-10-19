'use client';

import React, {useState} from "react";
import {doCreateUserWithEmailAndPassword} from "@/firebase/auth";
import {useRouter} from "next/navigation";

export default function Signup() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    const [isRegistering, setIsRegistering] = useState<boolean>(false);

    const router = useRouter();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (password !== passwordConfirm) {
            console.warn("Passwords do not match!");
        } else if (!isRegistering) {
            setIsRegistering(true);
            await doCreateUserWithEmailAndPassword(email, password).then(() => {
                console.log("Signup successful!");

                // Apparently you are already logged in?
                router.push("/personal/dashboard");
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <div className="w-full h-full">
            <form onSubmit={submit} className="flex flex-col gap-5 items-center justify-center h-full">
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border-2 border-primary rounded-xl p-3"
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border-2 border-primary rounded-xl p-3"
                />
                <input
                    type="password"
                    name="passwordConfirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="Confirm Password"
                    className="border-2 border-primary rounded-xl p-3"
                />
                <button className="button" type="submit">Sign Up</button>
            </form>
        </div>
    )
}