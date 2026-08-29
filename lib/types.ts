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
export interface IGear {
  id: string;
  name: string;
  description: string | null;
  brand: string | null;
  imageUrl: string | null;
  pricePerDay: string;
  stock: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  providerId: string;
  categoryId: string;

  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };

  provider?: {
    id: string;
    name: string;
  };
}
export interface ICategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
export interface IGearMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GearFilters {
  page?: number;
  limit?: number;
  categoryId?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export interface GearListResponse {
  gears: IGear[];
  meta: IGearMeta;
}
