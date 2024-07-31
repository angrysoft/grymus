"use client";
import useSWR from "swr";
import { Loader } from "../../../../(main)/components/Loader";
import { fetcher } from "../../../../lib/fetcher";
import { DefaultResponse } from "../../../../models/default-response";
import { NewsDataItem } from "../../../../models/news-data";
import { BaseForm } from "../../../components/BaseForm";
import { NewsForm } from "../../NewsForm";

export default function EditNews({
  params,
}: Readonly<{ params: { id: number } }>) {
  const { data } = useSWR<DefaultResponse<NewsDataItem>>(
    `/api/admin/news/${params.id}`,
    fetcher,
  );

  if (!data) {
    return <Loader />;
  }

  const { title, content, enabled, id, slug, short, pined, updatedAt } = {
    ...data.result,
  };

  return (
    <BaseForm backTo="/admin/news" title="Dodaj Stronę">
      <NewsForm
        title={title}
        content={content}
        enabled={enabled}
        short={short}
        pined={pined}
        id={id}
        slug={slug}
        updatedAt={updatedAt}
      />
    </BaseForm>
  );
}
