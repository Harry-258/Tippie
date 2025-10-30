import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
    const productImageSize = 600;

    return (
        <div className="w-full flex p-10 justify-evenly my-10 gap-10 items-center">
            <div className="flex flex-col gap-4">
                <Image src={'/logo_white.png'} alt={'Tippie logo'} height={500} width={500} />
                <Link className="button text-center text-xl" href="/personal/dashboard">
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
    );
}
