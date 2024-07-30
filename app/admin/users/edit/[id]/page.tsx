"use client";
import useSWR from "swr";
import { Loader } from "../../../../(main)/components/Loader";
import { fetcher } from "../../../../lib/fetcher";
import { DefaultResponse } from "../../../../models/default-response";
import { UserItem } from "../../../../models/users-data";
import { BaseForm } from "../../../components/BaseForm";
import { UserFrom } from "../../UserForm";

export default function EditUser({ params }: Readonly<{ params: { id: number } }>) {
  const { data } = useSWR<DefaultResponse<UserItem>>(
    `/api/admin/users/${params.id}`,
    fetcher,
  );

  if (!data) {
    return <Loader />;
  }

  const { id, email, active } = { ...data.result };
  console.log(data.result);

  return (
    <BaseForm backTo="/admin/users" title="Edytuj Użytkownika">
      <UserFrom id={id} email={email} active={active} />
    </BaseForm>
  );
}
