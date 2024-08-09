"use client";
import { BaseForm } from "../../components/BaseForm";
import { GalleryForm } from "../GalleryForm";

export default function AddGalery() {
  return (
    <BaseForm backTo="/admin/gallery" title="Dodaj Galerie">
      <GalleryForm />
    </BaseForm>
  );
}