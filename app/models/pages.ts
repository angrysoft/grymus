import { PageData } from "./page";

export interface PagesData {
  success: boolean;
  total: number;
  result: PageData[];
  currentOffset: number;
}
