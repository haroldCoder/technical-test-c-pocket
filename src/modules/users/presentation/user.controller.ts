import { Controller, Get, Param } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "../application/services";

@ApiTags("Users")
@Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get(":phone")
    @ApiOperation({ summary: "Find or create a user by phone number" })
    @ApiResponse({ status: 200, description: "Returns the user." })
    async findUser(@Param("phone") phone: string) {
        return this.userService.findOrCreate(phone);
    }
}
