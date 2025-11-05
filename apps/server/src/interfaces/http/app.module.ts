import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { PresenceService } from "../../application/presence/presence.service.js";
import { HealthController } from "./controllers/health.controller.js";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env", ".env.local"],
      cache: true,
    }),
  ],
  controllers: [HealthController],
  providers: [PresenceService],
})
export class AppModule {}
