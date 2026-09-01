export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  errorDetails?: unknown;
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

export type RentalStatus =
  | "PLACED"
  | "CONFIRMED"
  | "CANCELLED"
  | "PAID"
  | "PICKED_UP"
  | "RETURNED";

export interface IRentalOrderItem {
  id: string;
  quantity: number;
  price: string;
  gearItemId: string;
  gearItem: IGear;
}

// export interface IRentalOrder {
//   id: string;
//   status: RentalStatus;
//   startDate: string;
//   endDate: string;
//   totalAmount: string;
//   createdAt: string;
//   updatedAt: string;
//   customerId: string;
//   items: IRentalOrderItem[];
//   customer?: {
//     id: string;
//     name: string;
//     email: string;
//   };
// }
export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";
export type PaymentMethod = "STRIPE";

export interface IPayment {
  id: string;
  amount: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string | null;
  paidAt: string | null;
  createdAt: string;
  rentalOrderId: string;
  rentalOrder: IRentalOrder;
}
export interface IReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  customerId: string;
  gearItemId: string;
  customer: {
    id: string;
    name: string;
  };
}

export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
}
export interface IRentalOrder {
  id: string;
  status: RentalStatus;
  startDate: string;
  endDate: string;
  totalAmount: string;
  createdAt: string;
  updatedAt: string;
  customerId: string;
  items: IRentalOrderItem[];
  customer?: {
    id: string;
    name: string;
    email: string;
  };
  payment?: {
    id: string;
    status: PaymentStatus;
    amount: string;
    method: PaymentMethod;
    transactionId: string | null;
    paidAt: string | null;
  } | null;
}
