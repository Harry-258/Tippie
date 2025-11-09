'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
    InstagramLogoIcon,
    LinkedinLogoIcon,
    XLogoIcon,
    YoutubeLogoIcon,
} from '@phosphor-icons/react';
import React from 'react';

export default function Page({ children }: Readonly<{ children: React.ReactNode }>) {
    const headerRightOptions = [
        { text: 'Home', link: '/home' },
        { text: 'About', link: '/home/about' },
        { text: 'Contact', link: '/home/contact' },
        // { text: 'Dashboard', link: '/personal' },
        // { text: 'Register', link: '/auth/login' },
    ];

    const footerGetStartedOptions = [
        { text: 'Book a Demo', link: '/home/contact' },
        { text: 'Pricing', link: '/home/pricing' },
    ];

    const footerIconSizes = 40;

    return (
        <div className="w-full bg-primary flex-col flex justify-between">
            <div className="h-full">
                <div className="flex bg-black flex-row justify-between text-homeText text-xl font-bold px-16 py-8 w-full shadow-lg">
                    <div className="flex flex-row gap-6 items-center">
                        <Link href="/">
                            <Image
                                src="/logo_simple_white.png"
                                alt={'Tippie logo'}
                                height={150}
                                width={150}
                            />
                        </Link>
                    </div>

                    <div className="flex flex-row gap-8 items-center">
                        {headerRightOptions.map((option, index) => (
                            <Link href={option.link} key={index}>
                                {option.text}
                            </Link>
                        ))}
                    </div>
                </div>

                {children}
            </div>

            <div className="bg-black text-homeText text-lg flex flex-row p-16 gap-30 pb-32 justify-between">
                <div className="flex flex-col">
                    <Image
                        src={'/logo_simple_white.png'}
                        alt={'Tippie logo'}
                        height={150}
                        width={150}
                    />
                    <span className={'font-bold'}>Learn while you earn.</span>
                    <div className="flex flex-col text-[#4a4a4a] mt-4">
                        <span>Designed by Tippie.me</span>
                        <span>© 2025 All rights reserved.</span>
                    </div>
                </div>

                <div className="flex flex-row gap-32">
                    <div className="flex flex-col gap-4">
                        <span className="font-semibold text-xl">Explore</span>
                        <Link href="/home" className="text-[#8c8c91]">
                            Home
                        </Link>
                        {headerRightOptions.map((option, index) => (
                            <Link href={option.link} key={index} className="text-[#8c8c91]">
                                {option.text}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col gap-4 text-[#8c8c91]">
                        <span className="font-bold text-xl text-homeText">Get Started</span>
                        {footerGetStartedOptions.map((option, index) => (
                            <Link href={option.link} key={index}>
                                {option.text}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
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
                        <a href="">
                            <YoutubeLogoIcon size={footerIconSizes} />
                        </a>
                    </div>
                    <div className="text-[#4a4a4a]">Delft, Netherlands</div>
                </div>
                {/*<div className="text-[#8c8c91] w-full flex flex-col items-center gap-8 px-16">*/}
                {/*    <hr className="mt-1 border-t border-[#8c8c91] mx-16 w-full" />*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
