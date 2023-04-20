const { ForbiddenError } = require('../exceptions/errors');
const { logger } = require('../middlewares/logger');
const PaymentService = require('../services/payment.service');

module.exports = class PaymentController {
  constructor() {
    this.paymentService = new PaymentService();
  }

  // 결제 내역 생성
  createPayment = async (req, res, next) => {
    logger.info(`PaymentController.createPayment Request`);
    const { userId } = res.locals.user;
    const { companyId } = res.locals.company;
    const paymentData = res.body;

    try {
      const {
        success,
        imp_uid,
        merchant_uid,
        name,
        paid_amount,
        paid_at,
        pay_method,
        pg_provider,
        status,
      } = paymentData;
      const result = await this.paymentService.createPayment({
        userId,
        companyId,
        isSuccess: success,
        impUid: imp_uid,
        merchatUid: merchant_uid,
        paidName: name,
        paidAmount: paid_amount,
        paidAt: paid_at,
        payMethod: pay_method,
        pgProvider: pg_provider,
        status,
      });
      if (!result) {
        return res.status(400).json({ message: '결제에 실패하였습니다.' });
      }
      return res.status(200).json({ message: '결제에 성공하였습니다.' });
    } catch (error) {
      next(error);
    }
  };

  // userId 로 결제 내역 조회
  getPaymentsByUser = async (req, res, next) => {
    logger.info(`PaymentController.getPaymentsByUser Request`);
    const { userId } = res.locals.user;
    const { companyId } = res.locals.company;
    const paramsUserId = res.params.userId;

    if (userId !== paramsUserId) throw ForbiddenError('권한이 없습니다.');

    try {
      const result = await this.paymentService.getPaymentsByUser({
        userId,
        companyId,
      });
      return res.status(200).json({ data: result });
    } catch (error) {
      next(error);
    }
  };
};
