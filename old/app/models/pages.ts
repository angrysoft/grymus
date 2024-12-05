import { PageData } from "./page-data";

export interface PagesData {
  success: boolean;
  total: number;
  result: PageData[];
  currentOffset: number;
}
