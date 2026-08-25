export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export type Role = "CUSTOMER" | "PROVIDER" | "ADMIN";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export interface AuthData {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
