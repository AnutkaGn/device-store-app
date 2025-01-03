import { IsEmail, IsString, MinLength, MaxLength, Matches, IsPhoneNumber } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password is too short. Minimum length is 6 characters.' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/, {
    message: 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.',
  })
  password: string;

  @IsString()
  @MinLength(3, { message: 'Full name is too short. Minimum length is 3 characters.' })
  fullName: string;

  @IsPhoneNumber(undefined, { message: 'Invalid phone number format' })
  phoneNumber: string;

  @IsString()
  @MinLength(10, { message: 'Shipping address is too short. Minimum length is 10 characters.' })
  @MaxLength(255, { message: 'Shipping address is too long. Maximum length is 255 characters.' })
  shippingAddress: string;
}
