'use client';

import React, {useState} from "react";
import {doSignInWithEmailAndPassword} from "@/firebase/auth";
import {useRouter} from "next/navigation";

export default function Page() {
    // TODO: - Add Google login button
    //       - Redirect if already logged in

    // const { loggedIn } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

    const router = useRouter();

    async function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isLoggingIn) {
            setIsLoggingIn(true);
            doSignInWithEmailAndPassword(email, password).then(() => {
                console.log("Login successful!");
                router.push("/personal/dashboard");
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    // async function loginWithGoogle(e) {
    //     e.preventDefault();
    //     if (!isLoggingIn) {
    //         await signInWithGoogle().then(() => {
    //             console.log("Login successful!");
    //         }).catch((err) => {
    //             console.log(err);
    //             setIsLoggingIn(false);
    //         })
    //     }
    // }

    return (
        <div className="h-full w-full">
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
                <button className="button" type="submit">Login</button>
            </form>
        </div>
    )
}