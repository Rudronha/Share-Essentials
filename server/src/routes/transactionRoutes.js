const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

//routes for transaction initation make req and accept
//to send
router.post('/request/send',transactionController.makeRequest);
//to get user request
router.get('/request/:userId',transactionController.getAllRequest);
//to get requests on user items 
router.get('/request/user/:userId',transactionController.getAllItemRequest);
//react on the request
router.post('/respond/:requestId',transactionController.handelRequest);
//remove a request
router.get('/request/remove/:requestId',transactionController.handelRemoveRequest);

//route to complete transaction
//tommake transaction
router.post('/trans',transactionController.makeTransaction);
//to get user transaction
router.get('/trans/:userId',transactionController.getTransactions);
//to get transaction on user items
router.get('/trans/user/:userId',transactionController.getItemTransactions);

module.exports = router;