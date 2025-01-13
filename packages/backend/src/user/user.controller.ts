import { Controller, Get } from "@nestjs/common";
import { UserService } from "./user.service";
import { GetCurrentUser } from "@/common/decorators/get-user.decorator";
import { ResponseDto } from "@/common/dto/response.dto";
import { User } from "@prisma/client";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get("profile")
	async getUserProfile(
		@GetCurrentUser() userId: string,
	): Promise<ResponseDto<Partial<User>>> {
		return await this.userService.findById(userId);
	}
}
