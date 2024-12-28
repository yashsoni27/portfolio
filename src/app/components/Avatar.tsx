"use client";
import clsx from "clsx";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useEasterEggs } from '../context/EasterEggContext';

type AvatarProps = {
  image: {
    url: string;
    alt: string;
  };
  className?: string;
};

export default function Avatar({ image, className }: AvatarProps) {
  const component = useRef(null);
  const [lastTap, setLastTap] = useState(0);
  const { markDiscovered } = useEasterEggs();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".avatar",
        {
          opacity: 0,
          scale: 1.4,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.inOut",
        }
      );

      window.onmousemove = (e) => {
        if (!component.current) return;
        const componentRect = (
          component.current as HTMLElement
        ).getBoundingClientRect();
        const componentCenterX = componentRect.left + componentRect.width / 2;
        // const componentCenterY = componentRect.top + componentRect.height / 2;

        const componentPercent = {
          x: (e.clientX - componentCenterX) / componentRect.width / 2,
          // y: (e.clientY - componentCenterY) / componentRect.height,
        };

        const distFromCenter = 1 - Math.abs(componentPercent.x);

        gsap
          .timeline({
            defaults: { duration: 0.5, overwrite: "auto", ease: "power3.Out" },
          })
          .to(
            ".avatar",
            {
              rotation: gsap.utils.clamp(-2, 2, 5 * componentPercent.x),
              duration: 0.5,
            },
            0
          )
          .to(".highlight", {
            opacity: distFromCenter - 0.7,
            x: (-10 + 20) & componentPercent.x,
            duration: 0.5,
          }, 0);
      };
    }, component);
  }, []);

  const handleInteraction = (e: React.TouchEvent | React.MouseEvent) => {
    const now = Date.now();
    const DOUBLE_DELAY = 300;
    
    if (now - lastTap < DOUBLE_DELAY) {
      // Create emoji animation at interaction location
      const emoji = document.createElement('div');
      // emoji.innerHTML = '❤️';
      emoji.innerHTML = '⚡';
      emoji.style.position = 'absolute';
      
      // Handle both touch and mouse events
      const x = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
      const y = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
      
      emoji.style.left = `${x}px`;
      emoji.style.top = `${y}px`;
      document.body.appendChild(emoji);

      gsap.to(emoji, {
        y: -100,
        opacity: 0,
        duration: 1,
        onComplete: () => emoji.remove(),
      });

      // Mark easter egg as discovered
      markDiscovered('doubletap');
    }
    
    setLastTap(now);
  };

  return (
    <div ref={component} className={clsx("relative h-full w-full", className)} onTouchStart={handleInteraction}>
      <div className="avatar aspect-square1 overflow-hidden rounded-3xl border-2 border-slate-700 opacity-0f">
        <Image
          src={image.url}
          width={300}
          height={400}
          alt={image.alt}
          className="avatar-image h-full w-full object-fill"
        />
        <div className="highlight absolute inset-0 hidden w-full scale-110 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 md:block"></div>
      </div>
    </div>
  );
}
