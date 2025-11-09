import Image from 'next/image';
import { DescriptionCardWithImageProps } from '@/app/util/types';

export default function DescriptionCardWithImage({
    imageSrc,
    imageSize = 200,
    title,
    content,
    imageOnTheLeft = false,
}: DescriptionCardWithImageProps) {
    const imageClassName = 'rounded-xl transition duration-200 hover:scale-102 z-0';

    return (
        <div className="flex flex-row justify-center gap-16 w-full items-center">
            {imageOnTheLeft && (
                <div className="flex-shrink-0">
                    <Image
                        className={imageClassName}
                        src={imageSrc}
                        alt={title}
                        height={imageSize}
                        width={imageSize}
                    />
                </div>
            )}
            <div className="flex flex-col gap-8 w-1/2">
                <span className="text-3xl font-bold">{title}</span>
                <span className="text-lg font-semibold">{content}</span>
            </div>
            {!imageOnTheLeft && (
                <div className="flex-shrink-0">
                    <Image
                        className={imageClassName}
                        src={imageSrc}
                        alt={title}
                        height={imageSize}
                        width={imageSize}
                    />
                </div>
            )}
        </div>
    );
}
