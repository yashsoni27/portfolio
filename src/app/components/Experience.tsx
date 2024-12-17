import Bounded from "./Bounded";
import Heading from "./Heading";
import { experienceContent } from "@/data/content";

interface ExperienceItem {
  title: string;
  duration: string;
  institution: string;
  description?: string;
}

interface ExperienceContent {
  experience: ExperienceItem[];
  education: ExperienceItem[];
}

export default function Experience() {
  return (
    <Bounded>
      {Object.keys(experienceContent).map((section, sectionIndex) => (
        <div key={sectionIndex} className="px-4 py-10 md:px-6 md:py-14 lg:py-16">
          <Heading as="h2" size="lg" className="capitalize">
            {section}
          </Heading>
          {experienceContent[section as keyof ExperienceContent].map(
            (item, itemIndex) => (
              <div
                key={itemIndex}
                className="ml-6 mt-8 max-w-prose md:ml-12 md:mt-16"
              >
                <Heading as="h3" size="sm">
                  {item.title}
                </Heading>
                <div className="mt-1 flex w-fit items-center gap-1 text-2xl font-semibold tracking-tight text-slate-400">
                  <span>{item.duration}</span>{" "}
                  <span className="text-3xl font-extralight">/</span>{" "}
                  <span>{item.institution}</span>
                </div>
                <div className="prose prose-lg prose-invert mt-4">
                  <p>{item.description}</p>
                </div>
              </div>
            )
          )}
        </div>
      ))}
    </Bounded>
  );
}
