"use client";
import { BaseForm } from "../../components/BaseForm";
import { PageFrom } from "../PageFrom";

export default function AddPAge() {
  return (
    <BaseForm backTo="/admin/pages" title="Dodaj Stronę">
      <PageFrom />
    </BaseForm>
  );
}
