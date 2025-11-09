import Image from 'next/image';
import Link from 'next/link';
import DescriptionCardWithImage from '@/app/components/DescriptionCardWithImage';

export default function Home() {
    const productImageSize = 600;
    const descriptionImageHeight = 300;

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
                />
            </div>

            <div className="flex flex-col bg-black py-24 px-32 gap-24 text-homeText items-center justify-center">
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

            <div>something else here...</div>
        </div>
    );
}
