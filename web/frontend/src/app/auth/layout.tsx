'use client';

import React from "react";

export default function AuthLayout({ children }: Readonly<{children: React.ReactNode}>) {
    return (
        <div className="p-10 h-full w-full flex justify-center items-center">
            <div className="bg-white rounded-3xl shadow-lg px-12 py-10 w-full max-w-xl h-full">
                {children}
            </div>
        </div>
    )
}
