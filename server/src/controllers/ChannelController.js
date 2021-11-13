import express from "express";
import * as AuthHelper from "../middleware/AuthHelper";
import * as ChannelService from "../services/ChannelService";
const router = express.Router();

router.post("/", ChannelService.CreateChannel);
router.get("/", ChannelService.AllChanner);
router.get("/:channelId", ChannelService.OneChannel);
router.post("/join", AuthHelper.isLoggedIn, ChannelService.ChannelJoin);
router.get(
    "/participant/:channelId",
    AuthHelper.isLoggedIn,
    ChannelService.ParticipantList
);

export default router;
