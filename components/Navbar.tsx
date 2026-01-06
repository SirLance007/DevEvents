'use client';

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import posthog from 'posthog-js';

const Navbar = () => {
    const handleNavLinkClick = (linkName: string) => {
        posthog.capture('nav_link_clicked', {
            link_name: linkName,
            nav_location: 'header',
        });
    };

    return (
        <header>
            <nav>
                <Link href = '/' className='logo' onClick={() => handleNavLinkClick('logo')}>
                    <Image src = "/icons/logo.png" alt ="logo" width = {24}  />

                    <p>Dev Event</p>
                </Link>
                <ul>
                    <Link href="/" onClick={() => handleNavLinkClick('Home')}>Home</Link>
                    <Link href="/" onClick={() => handleNavLinkClick('Events')}>Events</Link>
                    <Link href="/" onClick={() => handleNavLinkClick('Create Events')}>Create Events</Link>
                </ul>
            </nav>
        </header>
    )
}

export default Navbar