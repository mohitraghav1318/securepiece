const express = require('express');
const dashboardController = require('../controllers/dashboard.controller');
const { requireAuth } = require('../middlewares/auth.middleware');

const router = express.Router();

// All dashboard operations require an authenticated user.
router.use(requireAuth);

router.get('/', dashboardController.getMyProfile);
router.patch('/profile', dashboardController.updateMyProfile);
router.delete('/account', dashboardController.deleteMyAccount);

module.exports = router;
