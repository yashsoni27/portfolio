"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Bounded from "@/app/components/Bounded";
import Shapes from "./Shapes";

interface HeroProps {
  firstName: string;
  lastName: string;
  tagLine: string;
  alternateTagLine: string;
}

const Hero = ({ firstName, lastName, tagLine, alternateTagLine }: HeroProps) => {
  // console.log(firstName, lastName, tagLine);
  const component = useRef(null);
  const taglineRef = useRef<HTMLSpanElement>(null);
  // const alternateTagLine = "Creative Developer";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.fromTo(
        ".name-animation",
        {
          x: -100,
          opacity: 0,
          rotate: -10,
        },
        {
          x: 0,
          opacity: 1,
          rotate: 0,
          ease: "elastic.out(1,0.2)",
          duration: 1.5,
          transformOrigin: "left top",
          delay: 0.5,
          stagger: { each: 0.1, from: "random" },
        }
      );

      tl.fromTo(
        ".job-title",
        {
          y: 20,
          opacity: 0,
          scale: 1.2,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          ease: "elastic.out(1,0.2)",
          duration: 1,
        }
      );

      // Add floating particles
      const particles = gsap.utils.toArray('.particle');
      particles.forEach((particle) => {
        gsap.to(".particle", {
          x: 'random(-100, 100)',
          y: 'random(-100, 100)',
          duration: 'random(2, 4)',
          repeat: -1,
          yoyo: true,
          ease: 'none'
        });
      });

      // Add hover animation for tagline
      if (taglineRef.current) {
        console.log("Setting up hover animations"); // Debug log

        const handleMouseEnter = () => {
          console.log("Mouse enter"); // Debug log
          gsap.to(taglineRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              console.log("Fade out complete"); // Debug log
              if (taglineRef.current) {
                taglineRef.current.textContent = alternateTagLine;
                gsap.set(taglineRef.current, { opacity: 0 }); // Ensure it's hidden
                gsap.to(taglineRef.current, {
                  opacity: 1,
                  duration: 0.3
                });
              }
            }
          });
        };

        const handleMouseLeave = () => {
          console.log("Mouse leave"); // Debug log
          gsap.to(taglineRef.current, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
              if (taglineRef.current) {
                taglineRef.current.textContent = tagLine;
                gsap.set(taglineRef.current, { opacity: 0 }); // Ensure it's hidden
                gsap.to(taglineRef.current, {
                  opacity: 1,
                  duration: 0.3
                });
              }
            }
          });
        };

        taglineRef.current.addEventListener('mouseenter', handleMouseEnter);
        taglineRef.current.addEventListener('mouseleave', handleMouseLeave);

        // Cleanup event listeners
        return () => {
          if (taglineRef.current) {
            taglineRef.current.removeEventListener('mouseenter', handleMouseEnter);
            taglineRef.current.removeEventListener('mouseleave', handleMouseLeave);
          }
        };
      }
    }, component);
    return () => ctx.revert();
  }, [tagLine, alternateTagLine]);

  const renderLetters = (name: string, key: string) => {
    if (!name) return;
    return name.split("").map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key} inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <Bounded ref={component}>
      <div className="grid min-h-[70vh] grid-cols-1 md:grid-cols-2 items-center">
        <Shapes />
        <div className="col-start-1 md:row-start-1">
          <h1 className="mb-8 text-[clamp(3rem,20vmin,20rem)] font-extrabold leading-none tracking-tighter">
            <span className="block text-slate-300">
              {renderLetters(firstName, "first")}
            </span>
            <span className="-mt-[.2em] block text-slate-500">
              {renderLetters(lastName, "last")}
            </span>
          </h1>
          <span 
            ref={taglineRef}
            className="job-title block bg-gradient-to-tr from-yellow-500 via-yellow-200 to-yellow-500 bg-clip-text text-2xl font-bold uppercase tracking-[.2em] text-transparent opacity-0 md:text-4xl cursor-pointer"
          >
            {tagLine}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="particle absolute w-1 h-1 bg-yellow-300/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </div>
    </Bounded>
  );
};

export default Hero;