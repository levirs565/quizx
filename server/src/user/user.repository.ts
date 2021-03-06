import { InjectModel } from '@nestjs/mongoose';
import { instanceToPlain } from 'class-transformer';
import { CommonServiceException } from 'common/common-service.exception';
import { BaseModel } from 'schemas/helper';
import { User } from 'types/user';
import { UserModelName } from '../schemas/user.schema';

export class UserRepository {
  constructor(@InjectModel(UserModelName) private readonly userModel: BaseModel<User>) {}

  async isRegistered(id: string): Promise<boolean> {
    const user = await this.userModel.findOne({ id });
    if (user) return true;
    return false;
  }

  async createOne(user: User) {
    const plain = instanceToPlain(user);
    const db = new this.userModel(plain);
    await db.save();
  }

  async getById(id: string): Promise<User> {
    const user = await this.userModel.findOne({ id })
    if (!user) {
      throw new CommonServiceException('User not registered');
    }
    return user.toClass()
  }
}
