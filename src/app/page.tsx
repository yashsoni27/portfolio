"use client";
import Hero from "@/app/components/Hero";
import { homeContent } from "@/data/content";
import SpotifyWidget from "./components/SpotifyWidget";

export default function Page() {
  return (
    <>
      <Hero
        firstName={homeContent.hero.firstName}
        lastName={homeContent.hero.lastName}
        tagLine={homeContent.hero.tagLine}
        alternateTagLine={homeContent.hero.alternateTagLine}
      />
      <div className="fixed bottom-12 left-12 z-50">
        <SpotifyWidget showDetails={true} />
      </div>
    </>
  );
}
