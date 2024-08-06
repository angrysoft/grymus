export interface FilesData {
  success: boolean;
  total: number;
  result: FilesDataItem[];
  currentOffset: number;
}

export interface FilesDataItem {
  id: number;
  name: string;
  size: number;
  type: string;
  icon: string;
  uploadedAt: string;
}
