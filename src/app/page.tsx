import Hero from "@/app/components/Hero";
import { homeContent } from "@/data/content";

export default function Page() {
  return (
    <>
       <Hero 
        firstName={homeContent.hero.firstName}
        lastName={homeContent.hero.lastName}
        tagLine={homeContent.hero.tagLine}
        alternateTagLine={homeContent.hero.alternateTagLine}
      />
    </>
  );
}
