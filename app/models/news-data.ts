export interface NewsData {
  id: number;
  title: string;
  slug: string;
  enabled: boolean;
  short: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsDataItem {
  id: number;
  title: string;
  enabled: boolean;
  updatedAt: string;
}
