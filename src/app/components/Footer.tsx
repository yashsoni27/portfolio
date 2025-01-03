import clsx from "clsx";
import React from "react";
import Link from "next/link";
import Bounded from "./Bounded";
import { FaGithub, FaLinkedin, FaEnvelope, FaXTwitter } from "react-icons/fa6";
import { siteSettings } from "@/data/content";

export default async function Footer() {
  return (
    <Bounded as="footer" className="text-slate-600">
      <div className="container mx-auto mt-20 flex flex-col items-center justify-between gap-6 py-8 sm:flex-row ">
        <div className="name flex flex-col items-center justify-center gap-x-4 gap-y-2 sm:flex-row sm:justify-self-start">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tighter text-slate-100 transition-colors duration-150 hover:text-yellow-400"
          >
            {siteSettings.name}
          </Link>
          <span
            className="hidden text-5xl font-extralight leading-[0] text-slate-400 sm:inline"
            aria-hidden={true}
          >
            /
          </span>
          <p className=" text-sm text-slate-300 ">
            © {new Date().getFullYear()} {siteSettings.name}
          </p>
        </div>
        {/* <div>
          <p className="text-xs text-slate-300">Made with ❤️</p>
        </div> */}
        {/* Footer Navigation */}
        {/* <nav className="navigation" aria-label="Footer Navigation">
          <ul className="flex items-center gap-1">
            {siteSettings.navItems.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li>
                  <Link
                    className={clsx(
                      "group relative block overflow-hidden  rounded px-3 py-1 text-base font-bold text-slate-100 transition-colors duration-150 hover:hover:text-yellow-400"
                    )}
                    href={link}
                  >
                    {label}
                  </Link>
                </li>
                {index < siteSettings.navItems.length - 1 && (
                  <span
                    className="text-4xl font-thin leading-[0] text-slate-400"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav> */}
        <div className="socials inline-flex justify-center sm:justify-end">
          {siteSettings.socialLinks.github && (
            <Link
              href={siteSettings.socialLinks.github}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={siteSettings.name + " on GitHub"}
            >
              <FaGithub />
            </Link>
          )}
          {siteSettings.socialLinks.linkedin && (
            <Link
              href={siteSettings.socialLinks.linkedin}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={siteSettings.name + " on LinkedIn"}
            >
              <FaLinkedin />
            </Link>
          )}
          {siteSettings.socialLinks.xTwitter && (
            <Link
              href={siteSettings.socialLinks.xTwitter}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={siteSettings.name + " on X"}
            >
              <FaXTwitter />
            </Link>
          )}
          {siteSettings.socialLinks.email && (
            <Link
              href={siteSettings.socialLinks.email}
              className="p-2 text-2xl text-slate-300 transition-all duration-150 hover:scale-125 hover:text-yellow-400"
              aria-label={siteSettings.name + " mail"}
            >
              <FaEnvelope />
            </Link>
          )}
        </div>
      </div>
    </Bounded>
  );
}
