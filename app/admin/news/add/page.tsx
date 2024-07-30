"use client";
import { BaseForm } from "../../components/BaseForm";
import { NewsForm } from "../PageFrom";

export default function AddPAge() {
  return (
    <BaseForm backTo="/admin/pages" title="Dodaj Stronę">
      <NewsForm />
    </BaseForm>
  );
}
