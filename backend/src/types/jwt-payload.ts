export interface AuthJwtPayload {
    id: string;  // User ID
    role: string; // User role
    name?: string; // User name
    email: string; // User name
    iat?: number; // Issued at (optional)
    exp?: number; // Expiration (optional)
}