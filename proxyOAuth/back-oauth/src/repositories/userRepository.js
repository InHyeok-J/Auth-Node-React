import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findById = async (id) => {
  try {
    return prisma.user.findUnique({ where: { id } });
  } catch (err) {
    console.error(err);
  }
};

export const findByEmail = async (email) => {
  try {
    return prisma.user.findMany({ where: { email } });
  } catch (err) {
    console.error(err);
  }
};

export const createLocal = async (data) => {
  try {
    const { email } = data;
    return await prisma.user.create({
      data: {
        email,
      },
    });
  } catch (err) {
    console.error(err);
  }
};
