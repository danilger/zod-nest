import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/database.module';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [DatabaseModule, PokemonModule],
})
export class AppModule {}
