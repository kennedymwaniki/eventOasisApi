import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { PaginationProvider } from 'src/pagination/providers/pagination.provider';
import { PaginatedQueryDto } from 'src/pagination/providers/dtos/paginatedQuery.dto';
import { Paginated } from 'src/pagination/providers/interfaces/paginated.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly paginationProvider: PaginationProvider,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOneBy({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new NotFoundException(
        `User with email ${createUserDto.email} already exists`,
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    createUserDto.password = hashedPassword;

    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAll(paginatedQuery: PaginatedQueryDto): Promise<Paginated<User>> {
    return this.paginationProvider.paginatedQuery(
      paginatedQuery,
      this.usersRepository,
    );
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    // check if a new password is provided
    if (updateUserDto.password) {
      const saltRounds = 10;
      updateUserDto.password = await bcrypt.hash(
        updateUserDto.password,
        saltRounds,
      );
      await this.usersRepository.update(id, updateUserDto).then(() => {
        return this.usersRepository.findOneBy({ id });
      });
    }

    return this.usersRepository.update(id, updateUserDto).then(async () => {
      const updatedUser = await this.usersRepository.findOneBy({ id });
      if (!updatedUser) {
        throw new NotFoundException(
          `User with ID ${id} not found after update`,
        );
      }
      return updatedUser;
    });
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  public async findUserByEmail(email: string) {
    const User = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!User) {
      console.log('User not found');
      throw new BadRequestException(`A user with such an email does not exist`);
    }
    console.log(`User with email ${email} found`);
    return User;
  }

  private async hashData(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
  }

  public async saveRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);

    await this.usersRepository.update(userId, {
      hashedRefreshToken: hashedRefreshToken,
    });
  }

  async signOut(userId: string) {
    // set user refresh token to null
    const res = await this.usersRepository.update(userId, {
      hashedRefreshToken: null,
    });

    if (res.affected === 0) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return { message: `User with id : ${userId} signed out successfully` };
  }
}
