

export interface GroupData {
  name: string;
  desc: string;
  image: string;
  urls: GroupUrl[];
}

export interface GroupUrl {
  name: string;
  url: string;
}
