'use client';

import { useEffect, useRef } from 'react';
import './banner.css';

export default function Banner() {
const imageRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    const handleScroll = () => {
    if (imageRef.current) {
        const scrollY = window.scrollY;
        imageRef.current.style.transform = `translateY(${scrollY * 0.3}px)`; // Efek parallax
    }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

return (
    <section className="banner-container">
    <div
        className="banner-image"
        ref={imageRef}
        style={{ backgroundImage: "url('/images/banner.png')" }}
    />
    <div className="banner-content">
        <h1 className="banner-title">Ideas</h1>
        <p className="banner-subtitle">Where all our great begin</p>
    </div>
    </section>
);
}
