'use client';

import { useEffect, useRef } from 'react';
import './banner.css';

interface BannerProps {
    imageUrl: string;
}

export default function Banner({ imageUrl }: BannerProps) {
const containerRef = useRef<HTMLDivElement>(null);
const imageRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    const handleScroll = () => {
    if (containerRef.current && imageRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const scrollProgress = Math.max(0, 1 - containerRect.top / window.innerHeight);
        
        imageRef.current.style.transform = `translateY(${scrollProgress * 50}px) scale(${1 + scrollProgress * 0.1})`;
    }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
}, []);

return (
    <div className="banner-wrapper">
    <section className="banner-container" ref={containerRef}>
        <div
        className="banner-image"
        ref={imageRef}
        style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <div className="banner-content">
        <h1 className="banner-title">Ideas</h1>
        <p className="banner-subtitle">Where all our great begin</p>
        </div>
    </section>
    </div>
);
}