import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetUserQuery } from '../impl';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { User } from 'src/entities/user';
import { GetUserDto } from 'src/auth/dto/get-user.dto';

@QueryHandler(GetUserQuery)
export class GetUserHandler implements IQueryHandler<GetUserQuery> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(query: GetUserQuery): Promise<GetUserDto> {
    const user = await this.userRepository.findOne({
      where: {
        id: query.id,
      },
    });

    if (!user) throw new NotFoundException('User does not exist!');

    return new GetUserDto(user);
  }
}
