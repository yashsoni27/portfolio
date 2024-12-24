import { homeContent } from "@/data/content";
import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";
import Button from "../components/Button";
import ScrollProgress from "../components/ScrollProgress";
import Avatar from "../components/Avatar";
import TechList from "../components/TechList";
import Experience from "../components/Experience";

export default function Page() {
  return (
    <>
      <ScrollProgress />
      <Bounded>
        <div className="grid gap-x-8 gap-y-6 md:grid-cols-[2fr, 1fr]">
          <Heading as="h1" size="lg" className="col-start-1">
            {homeContent.biography.heading}
          </Heading>
          <article
            className="prose prose-xl prose-slate prose-invert col-start-1"
            dangerouslySetInnerHTML={{
              __html: homeContent.biography.description,
            }}
          />

          <Button
            linkField={homeContent.biography.buttonLink}
            label={homeContent.biography.buttonLabel}
          />

          <Avatar
            image={{
              url: homeContent.biography.avatar,
              alt: homeContent.biography.imageAlt,
            }}
            className="row-start-1 max-w-sm md:col-start-2 md:row-end-3"
          />
        </div>
      </Bounded>
      <TechList />
      <Experience />
    </>
  );
}
