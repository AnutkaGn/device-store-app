import { Body, Controller, Delete, Get, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { GetCurrentUser } from "@/common/decorators/get-user.decorator";
import { ResponseDto } from "@/common/dto/response.dto";
import { User } from "@prisma/client";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ChangePasswordDto } from "./dto/change-password.dto";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getUserProfile(
		@GetCurrentUser() userId: string,
	): Promise<ResponseDto<Partial<User>>> {
		return await this.userService.findById(userId);
	}

	@Patch("profile")
	async updateUserProfile(
		@GetCurrentUser() userId: string,
		@Body() updateUserProfileDto: UpdateUserDto,
	): Promise<ResponseDto<Partial<User>>> {
		return await this.userService.updateProfile(userId, updateUserProfileDto);
	}

	@Patch("change-password")
	async changePassword(
		@GetCurrentUser() userId: string,
		@Body() changePasswordDto: ChangePasswordDto,
	): Promise<ResponseDto<null>> {
		return await this.userService.changePassword(userId, changePasswordDto);
	}

	@Delete()
	async deleteUser(
		@GetCurrentUser() userId: string,
	): Promise<ResponseDto<null>> {
		return await this.userService.delete(userId);
	}
}
