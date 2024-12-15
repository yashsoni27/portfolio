import { Metadata } from "next";
import Hero from "@/app/components/Hero";
import { homeContent } from "@/data/content";

export default function Page() {
  return (
    <>
       <Hero 
        firstName={homeContent.hero.firstName}
        lastName={homeContent.hero.lastName}
        tagLine={homeContent.hero.tagLine}
      />
    </>
  );
}

// export async function generateMetadata(): Promise<Metadata> {
//   // If you need to fetch metadata from an API, you can do it here
//   // For now, we'll use the static data
//   return {
//     title: pageData.meta_title,
//     description: pageData.meta_description,
//   };
// }
