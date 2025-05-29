import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from './config';

async function bootstrap() {
  const PORT = config.PORT || 2001
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT, () => console.log("Server is running on PORT: ", PORT));
}
bootstrap();
