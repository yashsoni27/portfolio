import React from "react";
import Link from "next/link";
import { siteSettings } from "@/data/content";

export default function Header() {
  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
      <nav>
        <ul>
          <li>
            <Link href="/" aria-label="Home Page">
              {siteSettings.name}
            </Link>
          </li>
          {siteSettings.navItems.map(({ link, label}, index) => (
            <li key={index}>
              <Link href={link}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}