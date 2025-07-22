'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './header.css';

export default function Header() {
const pathname = usePathname();
const [hidden, setHidden] = useState(false);
const [lastScrollY, setLastScrollY] = useState(0);

useEffect(() => {
    const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setHidden(currentScrollY > lastScrollY);
    setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
}, [lastScrollY]);

const navItems = [
    { href: '/', label: 'Work' },
    { href: '/about-page', label: 'About' },
    { href: '/services-page', label: 'Services' },
    { href: '/ideas-page', label: 'Ideas' },
    { href: '/careers-page', label: 'Careers' },
    { href: '/contact-page', label: 'Contact' },
];

return (
    <nav
        className={`navbar fixed-top shadow-sm transition-transform ${ hidden ? '-translate-y-full' : 'translate-y-0' }`}
        style={{ backdropFilter: 'blur(10px)' }}
    >
    <div className="container div-header d-flex justify-content-between align-items-center bg">
        <Link href="/" className="navbar-brand company-name fw-bold">
        Suitmedia Ideas
        </Link>
        <div className="d-flex gap-3 ">
        {navItems.map((item) => (
            <Link
            key={item.href}
            href={item.href}
            className={`nav-link ${
                pathname === item.href ? 'border-bottom border-2 border-dark' : ''
            }`}
            >
            {item.label}
            </Link>
        ))}
        </div>
    </div>
    </nav>
);
}
