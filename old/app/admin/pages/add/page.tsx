"use client";
import { BaseForm } from "../../components/BaseForm";
import { PageFrom } from "../PageForm";

export default function AddPAge() {
  return (
    <BaseForm backTo="/admin/pages" title="Dodaj Stronę">
      <PageFrom />
    </BaseForm>
  );
}
