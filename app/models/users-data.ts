export interface UsersData {
  success: boolean;
  total: number;
  result: UserItem[];
  currentOffset: number;
}

export interface UserItem {
  id: number;
  email: string;
  active: boolean;
  password?: string;
}