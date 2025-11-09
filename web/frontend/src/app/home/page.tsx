'use client';

import Image from 'next/image';
import Link from 'next/link';
import DescriptionCardWithImage from '@/app/components/DescriptionCardWithImage';
import { EnvelopeSimpleIcon, MapPinIcon } from '@phosphor-icons/react';
import React, { useState } from 'react';

export default function Home() {
    const [contactFormSubmitted, setContactFormSubmitted] = useState(false);

    const productImageSize = 600;
    const descriptionImageHeight = 300;
    const contactIconSize = 32;
    const inputClass = 'rounded-xl focus:outline-none p-3 bg-black';
    const labelClass = 'font-semibold mb-2';

    const submitContact = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.currentTarget.reset();
        setContactFormSubmitted(true);
    };

    return (
        <div className="w-full flex flex-col">
            <div className="w-full flex p-10 justify-evenly my-10 gap-10 items-center">
                <div className="flex flex-col gap-4">
                    <Image src={'/logo_white.png'} alt={'Tippie logo'} height={500} width={500} />
                    <Link className="button text-center text-xl" href="/home/coming_soon">
                        Try it now
                    </Link>
                </div>
                <Image
                    src={'/wristband_transparent.png'}
                    alt={'Tippie wristband'}
                    height={productImageSize}
                    width={productImageSize}
                    className="hover:scale-101 transition duration-200"
                />
            </div>

            <div
                id="how-to-section"
                className="flex flex-col bg-black py-24 px-32 gap-24 text-homeText items-center justify-center"
            >
                <span className="text-5xl text-homeText font-bold">How does it work?</span>

                <DescriptionCardWithImage
                    imageSrc={'/wristband_transparent.png'}
                    imageSize={descriptionImageHeight}
                    title={'Earn tips'}
                    content={
                        'Simply tap your phone on the NFC chip of the Tippie bracelet.\n' +
                        'You’ll be taken directly to your service provider’s personal tipping page,\n' +
                        'where you can leave a tip, rate their service, and share your feedback.'
                    }
                />

                <DescriptionCardWithImage
                    imageSrc={'/advice_page.png'}
                    imageSize={800}
                    title={'Learn'}
                    content={
                        'Ask Tippie’s AI for personalized investing insights and learn how ' +
                        'to grow the money you earn from tips — one question at a time.'
                    }
                    imageOnTheLeft={true}
                />

                <DescriptionCardWithImage
                    imageSrc={'/wristband_transparent.png'}
                    imageSize={descriptionImageHeight}
                    title={'Invest'}
                    content={
                        'Invest directly in stocks through our web app and watch your money grow over time.\n' +
                        'No complicated platforms, no hidden steps — just simple, smart investing designed for everyone.'
                    }
                />
            </div>

            <div id="contact-section" className="flex flex-row text-homeText px-32 py-24 gap-32">
                <form onSubmit={submitContact} className="flex flex-col w-1/2 gap-4">
                    <div className="flex flex-row w-full gap-16">
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="contact-name" className={labelClass}>
                                Name
                            </label>
                            <input
                                id="contact-name"
                                type="text"
                                placeholder="Enter name"
                                required
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col w-1/2">
                            <label htmlFor="contact-email" className={labelClass}>
                                Email
                            </label>
                            <input
                                id="contact-email"
                                type="text"
                                placeholder="Enter email"
                                required
                                className={inputClass}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="contact-subject" className={labelClass}>
                            Subject
                        </label>
                        <input
                            id="contact-subject"
                            type="text"
                            placeholder="Enter subject"
                            required
                            className={inputClass}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="contact-message" className={labelClass}>
                            Message
                        </label>
                        <textarea
                            rows={10}
                            id="contact-message"
                            placeholder="Enter message"
                            required
                            className={`${inputClass} resize-none`}
                        />
                    </div>

                    <button type="submit" className="button">
                        Submit
                    </button>
                </form>
                <div className="text-lg font-semibold flex flex-col w-1/2 gap-4">
                    <span className="text-3xl font-bold mb-4">
                        Let’s build something great together
                    </span>
                    <p>Have a question, partnership idea, or just want to say hi?</p>
                    <p className="mb-4">
                        We’d love to hear from you. Whether you’re a creator looking to join Tippie,
                        a business exploring collaboration, or a curious mind with feedback — reach
                        out and we’ll get back to you soon.
                    </p>
                    <div className="flex flex-row gap-4 items-center">
                        <MapPinIcon size={contactIconSize} />
                        <span>Delft, Netherlands</span>
                    </div>
                    <div className="flex flex-row gap-4 items-center">
                        <EnvelopeSimpleIcon size={contactIconSize} />
                        <span>info@tippie.me</span>
                    </div>

                    {contactFormSubmitted && (
                        <div className="text-lg font-normal mt-4 text-homeText/70">
                            <span className="font-bold mb-4">Thank You for Reaching Out!</span>
                            <p>We’ve received your message and will get back to you soon.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
