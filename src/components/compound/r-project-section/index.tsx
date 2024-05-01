import { SLoading } from "@src/components/root";
import { Suspense } from "react";
import { RProjectPayload } from "./r-project-payload";

export async function RProjectSection() {
  return (
    <div className="space-y-2">
      {/* title wrapper */}
      <div>
        <p className={`text-center font-bold text-4xl pb-3`}>My Projects</p>
        <hr />
        <hr />
      </div>
      <Suspense fallback={<SLoading text="My Project Page ...." />}>
        <RProjectPayload />
      </Suspense>
    </div>
  );
}
