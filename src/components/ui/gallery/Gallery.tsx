'use client';

import Image from "next/image";
import { useState, useEffect } from "react";



interface Image {
    id: number;
    src: {
        original: string;
        large: string;
        medium: string;
        small: string;
    };
    photographer: string;
}

const Gallery = () => {
    const [images, setImages] = useState<Image[]>([]);
    useEffect(() => {
        fetch("https://api.pexels.com/v1/search?query=landscape&per_page=10", {
            headers: {
                Authorization: `Bearer ${process.env.PEXELS_API_KEY}`
            }
        })
        .then (response => response.json())
        .then (data => {
            setImages(data.photos);
        })
        .catch (error => {
            console.error("Error fetching images:", error);
        });
    }, []);

    return (
        <div className="flex flex-row h-full w-full justify-center items-center px-24 gap-24">
            {images.map(image => (
                <div key={image.id} className="w-64 h-64 overflow-hidden rounded-lg shadow-lg">
                    <Image src={image.src.large} alt={`Photo by ${image.photographer}`} className="w-full h-full object-cover" />
                </div>
            ))}
        </div>
    )
;}

export default Gallery;