import { homeContent } from "@/data/content";
import Bounded from "@/app/components/Bounded";
import Heading from "@/app/components/Heading";
import Button from "../components/Button";

export default function Page() {
  return (
    <Bounded>
      <div className="grid1 gap-x-8 gap-y-6 md:grid-cols-[2fr, 1fr]">
        <Heading as="h1" size="lg" className="col-start-1">
          {homeContent.biography.heading}
        </Heading>
        <article
          className="prose prose-xl prose-slate prose-invert col-start-1"
          dangerouslySetInnerHTML={{ __html: homeContent.biography.description }}
          />

        <Button linkField={homeContent.biography.buttonLink} label={homeContent.biography.buttonLabel} />
      </div>
    </Bounded>
  );
}
