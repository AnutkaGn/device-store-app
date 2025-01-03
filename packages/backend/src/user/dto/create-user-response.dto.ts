import { UserRole } from '@prisma/client';

export class CreateUserResponseDto {
  id: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  shippingAddress: string;
  password: string;
  role: UserRole;
  isVerified: boolean;
  verificationCode?: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}
