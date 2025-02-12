import React from "react";
import Bounded from "../components/Bounded";
import Heading from "../components/Heading";
import { projectContent } from "@/data/content";
import ContentList from "../components/ContentList";

export default function Page() {
  return (
    <>
      <Bounded>
        <Heading size="xl" className="mb-8">
          {projectContent.heading}
        </Heading>

        <ContentList items={projectContent.projects} contentType="Project" viewMoreText="View more"/>
        
      </Bounded>
    </>
  );
}
