"use client";
import { BaseForm } from "../../components/BaseForm";
import { GroupForm } from "../GroupForm";

export default function AddGroup() {
  return (
    <BaseForm title="Dodaj Grupe" backTo="/admin/groups">
      <GroupForm />
    </BaseForm>
  );
}
