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

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          markers: false,
          trigger: component.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2, // seconds to complete animation
        },
      });

      tl.fromTo(
        ".tech-row",
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(600, 400)
              : gsap.utils.random(-600, -400);
          },
        },
        {
          x: (index) => {
            return index % 2 === 0
              ? gsap.utils.random(-600, -400)
              : gsap.utils.random(600, 400);
          },
          ease: "power1.inOut"
        }
      );
    }, component);
    return () => ctx.revert(); // cleanup
  });

  return (
    <>
      <section className="overflow-hidden" ref={component}>
        <Bounded as="div">
          <Heading size="xl" className="mb-8" as="h2">
            {techContent.heading}
          </Heading>
        </Bounded>
        {techContent.tech.map(({ name, color }, index) => (
          <div
            key={index}
            className="tech-row mb-8 flex items-center justify-center gap-4 text-slate-700"
            aria-label={name || undefined}
          >
            {Array.from({ length: 15 }, (_, index) => (
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
            ))}
            {color}
          </div>
        ))}
      </section>
    </>
  );
}
