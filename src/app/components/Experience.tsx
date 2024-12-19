"use client";
import Bounded from "./Bounded";
import Heading from "./Heading";
import { experienceContent } from "@/data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  duration: string;
  institution: string;
  description?: string;
  logo?: string;
}

interface ExperienceContent {
  experience: ExperienceItem[];
  education: ExperienceItem[];
}

export default function Experience() {
  const component = useRef(null);

  useEffect(() => {
    // Animate logos on scroll
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".logo").forEach((logo, index) => {
        const sectionIndex = parseInt(logo.dataset.sectionIndex || "0");
        gsap.fromTo(
          logo,
          {
            x: sectionIndex % 2 == 0 ? -200 : 200,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: logo,
              start: "top 80%",
              end: "top 50%",
              scrub: 2,
            },
          }
        );
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <Bounded ref={component}>
      {Object.keys(experienceContent).map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="px-4 py-10 md:px-6 md:py-14 lg:py-16 overflow-x-hidden"
        >
          <Heading
            as="h2"
            size="lg"
            className={`capitalize ${
              sectionIndex % 2 == 0
                ? "flex md:flex-row"
                : "flex md:flex-row-reverse"
            } flex-col`}
          >
            {section}
          </Heading>
          {experienceContent[section as keyof ExperienceContent].map(
            (item, itemIndex) => (
              <div
                key={itemIndex}
                className={`mx-2 mt-8 md:mx-18 md:mt-16 flex flex-col items-center gap-6 md:gap-8 justify-between ${
                  sectionIndex % 2 == 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-1 max-w-prose">
                  <Heading as="h3" size="sm">
                    {item.title}
                  </Heading>
                  <div className="mt-1 flex flex-col md:flex-row w-fit items-start md:items-center gap-1 text-lg md:text-2xl font-semibold tracking-tight text-slate-400">
                    <span>{item.duration}</span>{" "}
                    <span className="hidden md:inline text-3xl font-extralight">
                      /
                    </span>{" "}
                    <span>{item.institution}</span>
                  </div>
                  <div className="prose prose-base md:prose-lg prose-slate prose-invert mt-4 col-start-1">
                    <article
                      // className="prose prose-xl prose-slate prose-invert col-start-1"
                      dangerouslySetInnerHTML={{
                        __html: item.description || "",
                      }}
                    />
                  </div>
                </div>
                {/* Displaying logo next to description */}
                {item.logo && (
                  <div className="w-full md:w-auto flex justify-center">
                    <img
                      src={item.logo}
                      alt={`${item.institution} logo`}
                      className="logo md:ml-5 w-[150px] h-[150px] md:w-[200px] md:h-[200px] object-contain rounded-3xl"
                      data-section-index={sectionIndex}
                    />
                  </div>
                )}
              </div>
            )
          )}
        </div>
      ))}
    </Bounded>
  );
}
