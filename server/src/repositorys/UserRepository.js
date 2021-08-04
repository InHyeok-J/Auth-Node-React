import { PrismaClient } from "@prisma/client";

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
    console.log(data);
    try {
        const { name, email, password, nickname } = data;
        return await prisma.user.create({
            data: {
                name,
                email,
                password,
                nickname,
                provider: "local",
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findByEmailLocal = async (email) => {
    try {
        return prisma.user.findMany({ where: { email, provider: "local" } });
    } catch (err) {
        console.error(err);
    }
};
