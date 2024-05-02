import { RProjectSinglePage } from "@src/components/compound";

export interface ISingleProjectPage {
  params: { id: string };
}

export default async function SingleProjectPage({
  params: { id },
}: ISingleProjectPage) {
  return (
    <div className="ml-5 min-h-[80vh]">
      <RProjectSinglePage projectId={id} />
    </div>
  );
}
