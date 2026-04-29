import { Global, Module } from '@nestjs/common';
import { db } from './client';

export const DB_CLIENT = Symbol('DB_CLIENT');

@Global()
@Module({
  providers: [
    {
      provide: DB_CLIENT,
      useValue: db,
    },
  ],
  exports: [DB_CLIENT],
})
export class DatabaseModule {}
