import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://admin_01:wJo3E5B6XrZAPmaxqT2xmMLa2sbhwLUR@dpg-d3gp2oe3jp1c73eve48g-a:5432/zhs_db'
    }
  }
});

export default prisma;