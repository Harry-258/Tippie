'use client';

import Link from 'next/link';
import Image from 'next/image';
import { InstagramLogoIcon, LinkedinLogoIcon, XLogoIcon } from '@phosphor-icons/react';
import React from 'react';

export default function Page({ children }: Readonly<{ children: React.ReactNode }>) {
    const headerLeftOptions = [
        { text: 'About', link: '/home/about' },
        { text: 'Contact', link: '/home/contact' },
        { text: 'Dashboard', link: '/personal' },
    ];

    const footerGetStartedOptions = [
        { text: 'Book a Demo', link: '/home/contact' },
        { text: 'Pricing', link: '/home/pricing' },
    ];

    const footerIconSizes = 30;

    return (
        <div className="h-full w-full bg-background flex-col flex justify-between">
            <div className="h-full">
                <div className="flex flex-row justify-between bg-productBlue text-primary text-xl p-4 font-bold pr-15 pl-10 w-full shadow-lg">
                    <div className="flex flex-row gap-6 items-center">
                        <Link href="/">
                            <Image
                                src="/logo_simple.png"
                                alt={'Tippie logo'}
                                height={150}
                                width={150}
                            />
                        </Link>
                        {headerLeftOptions.map((option, index) => (
                            <Link href={option.link} key={index}>
                                {option.text}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-row gap-4 items-center">
                        <Link href="auth/login">Register</Link>
                    </div>
                </div>

                {children}
            </div>

            <div className="bg-primary text-foreground w-full flex flex-col py-20 gap-10">
                <div className="flex flex-row gap-30 text-lg pl-40 w-full">
                    <div className="flex flex-col gap-2">
                        <Image
                            src={'/logo_simple_white.png'}
                            alt={'Tippie logo'}
                            height={150}
                            width={150}
                        />
                        <span>Learn while you earn.</span>

                        <div className="flex flex-row gap-2 mt-4">
                            <a href="https://www.instagram.com/tippie.me/">
                                <InstagramLogoIcon size={footerIconSizes} />
                            </a>
                            <a href="">
                                <LinkedinLogoIcon size={footerIconSizes} />
                            </a>
                            <a href="">
                                <XLogoIcon size={footerIconSizes} />
                            </a>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="font-semibold text-xl">Explore</span>
                        {headerLeftOptions.map((option, index) => (
                            <Link href={option.link} key={index} className="text-[#8c8c91]">
                                {option.text}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col gap-2 text-[#8c8c91]">
                        <span className="font-semibold text-xl text-background">Get Started</span>
                        {footerGetStartedOptions.map((option, index) => (
                            <Link href={option.link} key={index}>
                                {option.text}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <span className="text-[#8c8c91] my-2">© 2025 Tippie Inc.</span>
                </div>
            </div>
        </div>
    );
}
