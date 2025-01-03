import { RegisterDto } from "@/auth/dto/register.dto";
import { IsNumber, IsOptional } from "class-validator";

export class CreateUserDto extends RegisterDto {
	@IsOptional()
	@IsNumber()
	verificationCode?: number | null;
}
