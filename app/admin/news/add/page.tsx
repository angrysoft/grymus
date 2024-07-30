"use client";
import { BaseForm } from "../../components/BaseForm";
import { NewsForm } from "../NewsForm";

export default function AddNews() {
  return (
    <BaseForm backTo="/admin/news" title="Dodaj Aktualność">
      <NewsForm />
    </BaseForm>
  );
}
