"use client";
import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { MdArrowOutward } from "react-icons/md";

type ContentListProps = {
  items: Array<{
    title: string;
    shortDesc?: string;
    tags: string[];
    img: string;
    link: string;
  }>;
  contentType: "Project" | "Blog";
  viewMoreText?: string;
};

export default function ContentList({
  items,
  contentType,
  viewMoreText = "View More",
}: ContentListProps) {
  const component = useRef(null);
  const revealRef = useRef(null);
  const itemsRef = useRef<Array<HTMLLIElement | null>>([]);
  const [currentItem, setCurrentItem] = useState<null | number>(null);

  const lastMousePos = useRef({ x: 0, y: 0 });

  // Initial bounce up animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.5,
            ease: "elastic.out(1,0.3)",
            scrollTrigger: {
              trigger: item,
              start: "top bottom-=100px",
              end: "bottom center",
              toggleActions: "play none none none",
            },
          }
        );
      });
      return () => ctx.revert();
    }, component);
  }, []);

  // Animation for background floating image on mouse hover
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const mousePos = {
        x: e.clientX,
        y: e.clientY + window.scrollY,
      };

      const speed = Math.sqrt(Math.pow(mousePos.x - lastMousePos.current.x, 2));

      const ctx = gsap.context(() => {
        if (currentItem !== null) {
          const maxY = window.scrollY + window.innerHeight - 350;
          const maxX = window.innerWidth - 250;

          gsap.to(revealRef.current, {
            x: gsap.utils.clamp(0, maxX, mousePos.x - 110),
            y: gsap.utils.clamp(0, maxY, mousePos.y - 160),
            rotation: speed * (mousePos.x > lastMousePos.current.x ? 1 : -1),
            ease: "back.out(2)",
            duration: 1.5,
            opacity: 1,
          });
        }
        lastMousePos.current = mousePos;
        return () => ctx.revert();
      }, component);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [currentItem]);

  const contentImages = items.map((item) => {
    const image = item.img ? item.img : "";
    return image;
  });

  return (
    <div ref={component}>
      <ul
        className="grid border-b border-b-slate-100"
        onMouseLeave={() => setCurrentItem(null)}
      >
        {items.map((item, index) => (
          <li
            key={index}
            className="list-item opacity-0f hover:[text-shadow:2px_2px_4px_rgba(0,0,0,0.7)]"
            onMouseEnter={() => setCurrentItem(index)}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
          >
            <Link
              href={item.link}
              className="flex flex-col justify-between border-t border-t-slate-100 py-10 text-slate-100 md:flex-row"
              aria-label={item.title}
            >
              <div className="flex flex-col">
                <span className="text-3xl font-bold">{item.title}</span>
                <div className="flex gap-3 text-yellow-400 text-lg font-bold">
                  {item.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                  ))}
                </div>
              </div>
              <span className="ml-auto flex items-center gap-2 text-xl font-medium md:ml-0">
                {contentType === "Blog" ? "Read More" : viewMoreText}{" "}
                <MdArrowOutward />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Hover element */}
      <div
        className="hover-reveal pointer-events-none absolute left-0 top-0 -z-10 h-[320px] w-[220px] rounded-lg bg-cover bg-center opacity-0 transition-[background] duration-300"
        style={{
          backgroundImage:
            currentItem !== null ? `url(${contentImages[currentItem]})` : "",
        }}
        ref={revealRef}
      ></div>
    </div>
  );
}
