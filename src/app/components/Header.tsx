"use client";
import React, { useState } from "react";
import Link from "next/link";
import { siteSettings } from "@/data/content";
import { MdClose, MdMenu } from "react-icons/md";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Button from "./Button";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="top-0 z-50 mx-auto max-w-7xl md:sticky md:top-4">
      <nav aria-label="Main Navigation">
        <ul className="flex flex-col justify-between rounded-b-lg bg-slate-50 px-4 py-2 md:m-4 md:flex-row md:items-center md:rounded-xl">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              aria-label="Home page"
              className="text-xl font-extrabold tracking-tighter text-slate-900"
            >
              {siteSettings.name}
            </Link>
            <button
              aria-expanded={open}
              aria-label="Open menu"
              className="block p-2 text-2xl text-slate-800 md:hidden"
              onClick={() => setOpen(true)}
            >
              <MdMenu />
            </button>
          </div>
          <div
            className={clsx(
              "fixed bottom-0 left-0 right-0 top-0 z-50 flex flex-col items-end gap-4 bg-slate-50 pr-4 pt-14 transition-transform duration-300 ease-in-out md:hidden",
              open ? "translate-x-0" : "translate-x-[100%]"
            )}
          >
            <button
              aria-label="Close menu"
              aria-expanded={open}
              className="fixed right-4 top-3 block p-2 text-2xl text-slate-800 md:hidden "
              onClick={() => setOpen(false)}
            >
              <MdClose />
            </button>
            {siteSettings.navItems.map(({ link, label }, index) => (
              <React.Fragment key={label}>
                <li className="first:mt-8">
                  <Link
                    className={clsx(
                      "group relative block overflow-hidden rounded px-3 text-3xl font-bold text-slate-900 "
                    )}
                    href={link}
                    onClick={() => setOpen(false)}
                    aria-current={
                      pathname.includes(link as string)
                        ? "page"
                        : undefined
                    }
                  >
                    <span
                      className={clsx(
                        "absolute inset-0 z-0 h-full translate-y-12 rounded bg-yellow-300 transition-transform duration-300 ease-in-out group-hover:translate-y-0",
                        pathname.includes(link as string)
                          ? "translate-y-6"
                          : "translate-y-18"
                      )}
                    />
                    <span className="relative">{label}</span>
                  </Link>
                </li>
                {index < siteSettings.navItems.length - 1 && (
                  <span
                    className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
                    aria-hidden="true"
                  >
                    /
                  </span>
                )}
              </React.Fragment>
            ))}
            <li>
              <Button
                linkField={siteSettings.cta_link}
                label={siteSettings.cta_label}
                className="ml-3"
              />
            </li>
          </div>
          <DesktopMenu settings={siteSettings} pathname={pathname} />

          {/* {siteSettings.navItems.map(({ link, label }, index) => (
            <li key={index}>
              <Link href={link}>{label}</Link>
            </li>
          ))} */}
        </ul>
      </nav>
    </header>
  );
}

function DesktopMenu({
  settings,
  pathname,
}: {
  settings: any;
  pathname: string;
}) {
  return (
    <div className="relative z-50 hidden flex-row items-center gap-1 bg-transparent py-0 md:flex">
      {siteSettings.navItems.map(({ link, label }, index) => (
        <React.Fragment key={label}>
          <li>
            <Link
              className={clsx(
                "group relative block overflow-hidden rounded px-3 py-1 text-base font-bold text-slate-900",
              )}
              href={link}
              aria-current={
                pathname.includes(link as string) ? "page" : undefined
              }
            >
              <span
                className={clsx(
                  "absolute inset-0 z-0 h-full rounded bg-yellow-300 transition-transform  duration-300 ease-in-out group-hover:translate-y-0",
                  pathname.includes(link as string)
                    ? "translate-y-6"
                    : "translate-y-8",
                )}
              />
              <span className="relative">{label}</span>
            </Link>
          </li>
          {index < siteSettings.navItems.length - 1 && (
            <span
              className="hidden text-4xl font-thin leading-[0] text-slate-400 md:inline"
              aria-hidden="true"
            >
              /
            </span>
          )}
        </React.Fragment>
      ))}
      <li>
        <Button
          linkField={siteSettings.cta_link}
          label={siteSettings.cta_label}
          className="ml-3"
        />
      </li>
    </div>
  );
}
