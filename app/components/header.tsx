'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './header.css';

export default function Header() {
    const pathname = usePathname();
    const [hidden, setHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isClient, setIsClient] = useState(false); 
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);

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

    if (!isClient) return null;

    return (
        <nav
            className={`navbar fixed-top shadow-sm transition-transform ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
            style={{ backdropFilter: 'blur(10px)' }}
        >
            <div className="container div-header d-flex justify-content-between align-items-center bg">
                <Link href="/" className="navbar-brand fw-bold">
                    <img src="/images/logo.png" alt="Suitmedia Logo" className="logo" />
                </Link>

                {/* Hamburger Button on mobile */}
                <button
                    className="navbar-toggler d-lg-none"
                    type="button"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>

                {/* Navigation Items */}
                <div className={`nav-items d-none d-lg-flex gap-3`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-link position-relative pb-3 ${pathname === item.href ? 'active-page' : ''}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu (dropdown) */}
                {menuOpen && (
                    <div className="mobile-menu d-lg-none position-absolute top-100 start-0 w-100 bg-white shadow-sm p-3 z-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`nav-link d-block py-2 ${pathname === item.href ? 'active-page' : ''}`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
}
