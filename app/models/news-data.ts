export interface NewsData {
  success: boolean;
  total: number;
  result: NewsDataItem[];
  currentOffset: number;
}

export interface NewsDataItem {
  id: number;
  title: string;
  slug: string;
  enabled: boolean;
  short: string;
  pined: boolean;
  createdAt: string;
  updatedAt: string;
}
