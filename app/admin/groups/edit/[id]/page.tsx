"use client";
import useSWR from "swr";
import { Loader } from "../../../../(main)/components/Loader";
import { fetcher } from "../../../../lib/fetcher";
import { DefaultResponse } from "../../../../models/default-response";
import { GroupItem } from "../../../../models/group-data";
import { BaseForm } from "../../../components/BaseForm";
import { GroupForm } from "../../GroupForm";

export default function EditGroup({
  params,
}: Readonly<{ params: { id: number } }>) {
  const { data } = useSWR<DefaultResponse<GroupItem>>(
    `/api/admin/groups/${params.id}`,
    fetcher,
  );

  if (!data) {
    return <Loader />;
  }

  const { id, name, image, sort } = { ...data.result };

  return (
    <BaseForm backTo="/admin/groups" title="Edytuj Grupe">
      <GroupForm id={id} name={name} image={image} sort={sort} />
    </BaseForm>
  );
}
