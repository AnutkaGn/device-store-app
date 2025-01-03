import { IsEmail, IsString, MinLength, Matches } from "class-validator";

export class LoginDto {
	@IsEmail({}, { message: "Invalid email format" })
	email: string;

	@IsString()
	@MinLength(6, {
		message: "Password is too short. Minimum length is 6 characters.",
	})
	@Matches(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/,
		{
			message:
				"Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.",
		},
	)
	password: string;
}
