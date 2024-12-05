"use client";
import { BaseForm } from "../../components/BaseForm";
import { UserFrom } from "../UserForm";

export default function AddPAge() {
  return (
    <BaseForm title="Dodaj Użytkownika" backTo="/admin/users">
      <UserFrom />
    </BaseForm>
  );
}
