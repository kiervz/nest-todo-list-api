import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../impl';
import { UserService } from 'src/user/user.service';
import { UserDto } from 'src/user/dto/user.dto';

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private readonly userService: UserService) {}

  async execute(query: GetUserByIdQuery): Promise<UserDto> {
    return this.userService.getUserById(query.id);
  }
}
