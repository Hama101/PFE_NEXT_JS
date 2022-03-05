import Image from "next/image";

// this will be our gloabl image preview component that will be used in multiple places
export default function ImagePreview({ thumbnailUrl, slug }) {
    return (
        <img
            src={thumbnailUrl}
            alt={`thumbnail for ${slug}`}
        />
    );
}