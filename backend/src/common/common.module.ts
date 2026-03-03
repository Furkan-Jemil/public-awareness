import { Global, Module } from '@nestjs/common';
import { HealthController } from './controllers/health.controller';

@Global()
@Module({
  controllers: [HealthController],
})
export class CommonModule {}
