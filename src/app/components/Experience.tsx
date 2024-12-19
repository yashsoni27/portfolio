"use client";
import Bounded from "./Bounded";
import Heading from "./Heading";
import { experienceContent } from "@/data/content";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
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
  useEffect(() => {
    // Animate logos on scroll
    gsap.utils.toArray<HTMLElement>(".logo").forEach((logo, index) => {
      const sectionIndex = parseInt(logo.dataset.sectionIndex || "0");
      // console.log(sectionIndex);
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
  });

  return (
    <Bounded>
      {Object.keys(experienceContent).map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="px-4 py-10 md:px-6 md:py-14 lg:py-16"
        >
          <Heading
            as="h2"
            size="lg"
            className={`capitalize ${
              sectionIndex % 2 == 0 ? "flex" : "flex flex-row-reverse"
            }`}
          >
            {section}
          </Heading>
          {experienceContent[section as keyof ExperienceContent].map(
            (item, itemIndex) => (
              <div
                key={itemIndex}
                className={`mx-6 mt-8 md:mx-18 md:mt-16 flex items-center justify-between ${
                  sectionIndex % 2 == 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="flex-1 max-w-prose">
                  <Heading as="h3" size="sm">
                    {item.title}
                  </Heading>
                  <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
                    <span>{item.duration}</span>{" "}
                    <span className="text-3xl font-extralight">/</span>{" "}
                    <span>{item.institution}</span>
                  </div>
                  <div className="prose prose-lg prose-slate prose-invert mt-4 col-start-1">
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
                  <div>
                    <img
                      src={item.logo}
                      alt={`${item.institution} logo`}
                      className="logo ml-5 w-[200px] h-[200px] object-contain rounded-3xl"
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
