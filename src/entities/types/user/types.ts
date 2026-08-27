export type User = {
    userId: string;
    displayName: string;
    avatarUrl?: string;
    accessToken?: string;
    deviceId?: string;
    isOnline?: boolean;
    lastActive?: Date;

}

export type userSession = {
    user: User | null;
    isLoggedIn: boolean;
    isLoading: boolean;
    error: string | null;
}

export type LoginData = {
    username: string;
    password: string;

}

export type RegisterData = {
    username: string;
    password: string;
    email: string;
}

export type Authresponse = {
    userId: string;
    accessToken: string;
    deviceId: string;
}

export type UpdateUUserData = Partial<User>;