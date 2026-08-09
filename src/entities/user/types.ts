export interface User {

userId: string;
displayName: string;
avatarUrl: string;
presence: UserPresence;

}

export type UserPresence = 
| 'online'
| 'offline'
| 'unavailable'