import { registerAs } from "@nestjs/config";

export default registerAs('fruityvice', () => ({
    baseUrl: process.env.FRUITYVICE_URL,
  }));