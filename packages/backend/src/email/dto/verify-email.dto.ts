import { IsEmail, IsNumber, Length } from 'class-validator';

export class VerifyEmailDto {
  @IsNumber()
  @Length(4, 4, { message: 'Verification code must be 4 characters long' })
  verificationCode: number;

  @IsEmail({}, { message: 'Invalid email format' })
  email: string;
}
