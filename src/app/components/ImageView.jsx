import Image from "next/image";

export default function ImageView({ src, alt, ...props }) {
    return (
        <>
            <Image src={src} alt={alt} {...props} />
        </>
    )
}
