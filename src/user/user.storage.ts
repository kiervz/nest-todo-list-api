import { AsyncLocalStorage } from 'async_hooks';
import { UserDto } from './dto/user.dto';
import { UnauthorizedException } from '@nestjs/common';

export const UserStorage = {
  storage: new AsyncLocalStorage<UserDto>(),
  get() {
    if (this.storage.getStore()) {
      return this.storage.getStore();
    } else {
      throw new UnauthorizedException();
    }
  },
  set(user: UserDto) {
    return this.storage.enterWith(user);
  },
};
