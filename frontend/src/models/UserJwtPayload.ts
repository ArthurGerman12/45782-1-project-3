export interface UserJwtPayload {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: "admin" | "user"
    iat: number;         // issued at
    createdAt: string;
    updatedAt: string;
}
