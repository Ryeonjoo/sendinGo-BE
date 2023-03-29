const { logger } = require('../middlewares/logger');
const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} = require('../exceptions/errors');
const GroupRepository = require('../repositories/group.repository');

module.exports = class GroupService {
  constructor() {
    this.groupRepository = new GroupRepository();
  }
  // 빈 Group 생성
  createGroup = async ({ userId, companyId, groupName, groupDescription }) => {
    logger.info(`GroupService.createGroup Request`);

    const groupData = await this.groupRepository.createGroup({
      userId,
      companyId,
      groupName,
      groupDescription,
    });
    if (!groupData) {
      throw new BadRequestError('그룹 생성에 실패하였습니다.');
    }

    return groupData;
  };

  //그룹 전체 조회
  getAllGroup = async () => {
    logger.info(`GroupService.getAllGroup Request`);
    const allGroupData = await this.groupRepository.getAllGroup();
    if (!allGroupData) {
      throw new BadRequestError('그룹 조회에 실패하였습니다.');
    }
    return allGroupData;
  };

  //그룹 삭제
  deleteGroup = async ({ userId, companyId, groupId }) => {
    logger.info(`GroupService.deleteGroup Request`);
    const data = await this.groupRepository.findGroupId({
      groupId,
    });
    if (data.userId !== userId || data.companyId !== companyId) {
      throw new ForbiddenError('삭제 권한이 없습니다.');
    }
    const deleteGroupData = await this.groupRepository.deleteGroup({
      userId,
      companyId,
      groupId,
    });
    if (!deleteGroupData) {
      throw new BadRequestError('그룹 삭제에 실패하였습니다.');
    }

    return deleteGroupData;
  };
};
