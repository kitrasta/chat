export interface UserSession {
  accessToken: string;
  userId: string;
  homeServer: string;
  deviceId: string;
}

export interface UserProfile {
  userId: string;
  displayName: string;
  avatarUrl?: string;
}
