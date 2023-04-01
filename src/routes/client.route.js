const express = require('express');
const router = express.Router();
const JoiHelper = require('../helpers/joi.Helper');
const authMiddleware = require('../middlewares/auth.middleware');

const ClientController = require('../controllers/client.controller');
const clientController = new ClientController();

router.post(
  '/',
  authMiddleware,
  JoiHelper.clientCheck,
  clientController.createClient
);
router.post('/bulk', authMiddleware, clientController.createClientBulk);

router.get('/', authMiddleware, clientController.getClients);

router.patch(
  '/:clientId',
  authMiddleware,
  JoiHelper.clientId,
  clientController.editClientInfo
);
router.delete(
  '/:clientId',
  authMiddleware,
  JoiHelper.clientId,
  clientController.deleteClient
);

module.exports = router;
