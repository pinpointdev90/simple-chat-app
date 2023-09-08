export interface UserModelType {
    id: number;
    username: string;
    email: string;
    password: string;
}

export interface MessageItemType {
    sender: string;
    message?: string;
}
