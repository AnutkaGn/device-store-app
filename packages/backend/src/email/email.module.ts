import { Module } from "@nestjs/common";
import { EmailService } from "./email.service";
import { UserService } from "@/user/user.service";

@Module({
	providers: [EmailService, UserService],
})
export class EmailModule {}
