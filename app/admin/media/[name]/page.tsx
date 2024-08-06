"use client";
import useSWR from "swr";
import { Loader } from "../../../[lang]/components/Loader";
import { fetcher } from "../../../../lib/utils";
import { Button } from "../../../components/Button";
import Link from "next/link";

export default function Media({ params }: { params: { name: string } }) {
  const { data, error } = useSWR(`/api/photos/byName/${params.name}`, fetcher);
  console.error("error: ", error);
  if (!data) return <Loader />;

  return (
    <div className="max-h-full p-1">
      <section className="grid grid-cols-[2fr_1fr] h-full gap-2 relative ">
        <Link
          className="grid justify-items-center relative"
          href={"/photos/" + params.name}
        >
          <img
            className="h-full max-h-full absolute top-0"
            src={"/photos/" + params.name}
            alt=""
          />
        </Link>
        <div className="grid gap-1 content-start bg-surface rounded p-2">
          <div>
            <span className="font-bold text-primary">Nazwa: </span>
            <span className="text-onSurface">{data.result.name}</span>
          </div>
          <div>
            <span className="font-bold text-primary">Rozmiar: </span>
            <span className="text-onSurface">
              {(Number(data.result.size) / 1000000).toFixed(2)} mb
            </span>
          </div>
          <div>
            <span className="font-bold text-primary">Przesłano: </span>
            <span className="text-onSurface">{data.result.uploadedAt}</span>
          </div>
          <Button to="/admin/photos">Wróć do zdjęć</Button>
        </div>
      </section>
    </div>
  );
}