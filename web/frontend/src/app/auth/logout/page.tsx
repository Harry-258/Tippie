'use client';

import {useAuth} from "@/contexts/authContext";
import {doSignOut} from "@/firebase/auth";
import {redirect} from "next/navigation";
import {useEffect} from "react";

export default function Logout() {
    const {loggedIn} = useAuth();

    useEffect(() => {
        const run = async () => {
            if (loggedIn) {
                await doSignOut();
            }
            redirect("/auth/login");
        }

        run();
    });
}