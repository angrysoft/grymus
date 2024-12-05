export interface GroupItem {
  id?: number;
  name?: string;
  image?: string;
  sort?: number;
  desc?: string;
}

export interface GroupsData {
  success: boolean;
  total: number;
  result: GroupItem[];
}
