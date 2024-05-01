import { RProjectSection } from "@src/components/compound/r-project-section";
import { SLoading } from "@src/components/root";
import { Suspense } from "react";

export default async function ProjectPage() {
  return (
    <div className={` ml-5 min-h-[80vh]`}>
      <RProjectSection />
    </div>
  );
}
