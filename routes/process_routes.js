const express = require('express');
const router = express.Router();
const controller = require('../controller/process_controller');

router.post('/', controller.createProcess);
router.get('/', controller.getProcesses);
router.post('/ai', controller.createProcessUsingAI);
router.post('/:processId', controller.updateProcess);
module.exports = router;