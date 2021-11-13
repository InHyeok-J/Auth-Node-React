import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const findAll = async () => {
    try {
        return await prisma.channel.findMany({
            select: {
                id: true,
                name: true,
                participant: true,
                channelRoom: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const craeteChannel = async (name) => {
    try {
        return await prisma.channel.create({
            data: {
                name,
                createdAt: now,
                channelRoom: {
                    create: {
                        name,
                        createdAt: now,
                    },
                },
            },
            select: {
                id: true,
                name: true,
                participant: true,
                channelRoom: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const findById = async (id) => {
    try {
        return await prisma.channel.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                participant: {
                    select: {
                        userId: true,
                        User: {
                            select: {
                                name: true,
                                nickname: true,
                                email: true,
                            },
                        },
                    },
                },
                channelRoom: true,
            },
        });
    } catch (err) {
        console.error(err);
    }
};

export const updateChannelUser = async (id, userId) => {
    try {
        return await prisma.channel.update({
            where: { id },
            data: {
                participant: {
                    create: {
                        userId,
                        createdAt: now,
                    },
                },
            },
        });
    } catch (err) {
        console.error(err);
    }
};
