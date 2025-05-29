import React from "react";
import { ContainerScroll } from "../components/ui/container-scroll-animation";

export function AboutSection() {
  return (
    <div>
      <ContainerScroll
        titleComponent={
          <>
          </>
        }>
        <img
          src={'/assets/tabImg.png'}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-right-top"
          draggable={false} />
      </ContainerScroll>
      </div>
  );
}
