import React from "react";
import Bounded from "../components/Bounded";
import Heading from "../components/Heading";
import { projectContent } from "@/data/content";
import ProjectList from "../components/ProjectList";

export default function Page() {
  return (
    <>
      <Bounded>
        <Heading size="xl" className="mb-8">
          {projectContent.heading}
        </Heading>
        {/* <div className="prose prose-xl prose-slate prose-invert mb-10">

        </div> */}
        <ProjectList />
      </Bounded>
    </>
  );
}
