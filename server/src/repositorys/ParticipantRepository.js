import { PrismaClient } from "@prisma/client";
import { dbNow } from "../utils/dayUtils";

const now = dbNow();
const prisma = new PrismaClient();

export const findByChannelId = async (channelId) => {
    try {
        return await prisma.participant.findMany({
            where: { channelId },
        });
    } catch (err) {
        console.error(err);
    }
};
