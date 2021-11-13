import * as UserRepository from "../repositorys/UserRepository";
import resutils from "../utils/resutils";
import * as ChannelRepository from "../repositorys/ChannelRepository";

export const AllChanner = async (req, res, next) => {
    try {
        const response = await ChannelRepository.findAll();
        return res
            .status(200)
            .send(resutils.successData(200, "전체 채널 조회", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const CreateChannel = async (req, res, next) => {
    try {
        const response = await ChannelRepository.craeteChannel(req.body.name);
        return res
            .status(200)
            .send(resutils.successData(200, "채널 생성 성공", response));
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const OneChannel = async (req, res, next) => {
    try {
        console.log(req.params.channelId);
        const response = await ChannelRepository.findById(
            parseInt(req.params.channelId, 10)
        );
        if (response) {
            return res
                .status(200)
                .send(resutils.successData(200, "조회성공", response));
        } else {
            return res.status(400).send(resutils.fail(400, "조회실패"));
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const ChannelJoin = async (req, res, next) => {
    try {
        console.log(req.body.channelId, req.user.id);
        const response = await ChannelRepository.updateChannelUser(
            req.body.channelId,
            req.user.id
        );
        if (!response) {
            return res.status(400).send(resutils.fail(400, "채널 가입 실패"));
        } else {
            return res
                .status(200)
                .send(resutils.successData(200, "채널 가입성공", response));
        }
    } catch (err) {
        console.error(err);
        next(err);
    }
};

export const ParticipantList = async (req, res, next) => {
    try {
    } catch (err) {
        console.error(err);
        next(err);
    }
};
