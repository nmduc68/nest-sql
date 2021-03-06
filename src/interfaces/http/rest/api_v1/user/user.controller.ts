import {
    Body,
    Controller,
    Get,
    Query,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserUsecase } from '@src/app/user/createUser/createUser.usecase';
import { ListUsersUsecase } from '@src/app/user/listUsers/listUsers.usecase';
import { CacheInterceptor } from '@src/interfaces/interceptor/cache.interceptor';
import {
    CreateUserPayload,
    ListUsersPayload,
    UserEntity,
} from '@src/domain/user';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
@UseInterceptors(CacheInterceptor)
export class UserController {
    constructor(
        private readonly createUserUsecase: CreateUserUsecase,
        private readonly listUsersUsecase: ListUsersUsecase,
    ) {}

    @Post()
    @ApiBearerAuth()
    async createUser(
        @Body() createUserPayload: CreateUserPayload,
    ): Promise<UserEntity> {
        return await this.createUserUsecase.processRequest(createUserPayload);
    }

    @Get()
    @ApiBearerAuth()
    async listUsers(@Query() filter: ListUsersPayload) {
        return await this.listUsersUsecase.processRequest(filter);
    }
}
