import React from "react";
import Bounded from "../components/Bounded";
import Heading from "../components/Heading";
import { blogContent } from "@/data/content";
import ContentList from "../components/ContentList";

export default function Page() {
  return (
    <>
      <Bounded>
        <Heading size="xl" className="mb-8">
          {blogContent.heading}
        </Heading>

        <ContentList items={blogContent.blogs} contentType="Blog" viewMoreText="Read more"/>
        
      </Bounded>
    </>
  );
}
