/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { CreateCachingDto } from './dto/create-caching.dto';
import { UpdateCachingDto } from './dto/update-caching.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async create(createCachingDto: CreateCachingDto) {
    const { key, value, ttl } = createCachingDto;

    try {
      // Set the value in cache with optional TTL
      if (ttl) {
        await this.cacheManager.set(key, value, ttl * 1000); // Convert seconds to milliseconds
      }
      await this.cacheManager.set(key, value); // Convert seconds to milliseconds

      return {
        success: true,
        message: `Cache entry created successfully`,
        data: {
          key,
          value,
        },
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to create cache entry: ${JSON.stringify(error)}`,
        data: null,
      };
    }
  }

  findAll() {
    return `This action returns all caching`;
  }

  findOne(id: number) {
    return `This action returns a #${id} caching`;
  }

  update(id: number, updateCachingDto: UpdateCachingDto) {
    return `This action updates a #${id} caching`;
  }

  remove(id: number) {
    return `This action removes a #${id} caching`;
  }
}
