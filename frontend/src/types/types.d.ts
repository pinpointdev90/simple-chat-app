export interface User {
  id?: number;
  nickname?: string;
  token?: string | null | undefined;
}

export interface Room {
  id: number;
  room: string;
  owner: string;
  attends?: string[];
}

export interface MessageItemType {
  sender: string;
  text: string;
}
