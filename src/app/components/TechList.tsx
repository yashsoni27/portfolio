"use client";
import React, { useEffect, useRef } from "react";
import { techContent } from "@/data/content";
import { MdCircle } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Heading from "./Heading";
import Bounded from "./Bounded";
gsap.registerPlugin(ScrollTrigger);

export default function TechList() {
  const component = useRef(null);

  // useEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         markers: false,
  //         trigger: component.current,
  //         start: "top bottom",
  //         end: "bottom top",
  //         scrub: 2, // seconds to complete animation
  //       },
  //     });

  //     tl.fromTo(
  //       ".tech-row",
  //       {
  //         x: (index) => {
  //           return index % 2 === 0
  //             ? gsap.utils.random(600, 400)
  //             : gsap.utils.random(-600, -400);
  //         },
  //       },
  //       {
  //         x: (index) => {
  //           return index % 2 === 0
  //             ? gsap.utils.random(-600, -400)
  //             : gsap.utils.random(600, 400);
  //         },
  //         ease: "power1.inOut"
  //       }
  //     );
  //   }, component);
  //   return () => ctx.revert(); // cleanup
  // });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const techItems = document.querySelectorAll(".tech-row");

      techItems.forEach((item) => {
        const icon = item.querySelector(".tech-icon");
        const text = item.querySelector(".tech-text");

        gsap.set(text, { opacity: 0, y: 10 });

        item.addEventListener("mouseenter", () => {
          gsap.to(icon, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: "power2.out",
          });
          gsap.to(text, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
          });
        });

        item.addEventListener("mouseleave", () => {
          gsap.to(icon, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(text, {
            opacity: 0,
            y: 10,
            duration: 0.5,
            ease: "power2.out",
          });
        });
      });
    }, component);

    return () => ctx.revert(); //cleanup
  });

  return (
    <>
      <section className="overflow-hidden" ref={component}>
        <Bounded as="div">
          <Heading size="xl" className="mb-8" as="h2">
            {techContent.heading}
          </Heading>
        </Bounded>
        <Bounded as="div">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {techContent.tech.map(({ name, color, icon }, index) => (
              <div
                key={index}
                className="tech-row group relative flex h-[120px] w-[120px] items-center justify-center"
                aria-label={name || undefined}
              >
                <img
                  // width={200}
                  // height={200}
                  src={icon}
                  alt={name}
                  className="tech-icon absolute"
                />
                <span className="tech-text absolute text-3xl text-slate-400 font-extrabold tracking-tighter">
                  {name}
                </span>

                    {/* {Array.from({ length: 15 }, (_, index) => (
                  <React.Fragment key={index}>
                    <span
                      className="tech-item text-8xl font-extrabold uppercase tracking-tighter"
                      style={{
                        color: index === 7 && color ? color : "inherit",
                      }}
                    >
                      {name}
                    </span>
                    <span className="text-3xl">
                      <MdCircle />
                    </span>
                  </React.Fragment>
                ))} */}
              </div>
            ))}
          </div>
        </Bounded>
      </section>
    </>
  );
}
