//const { clients } = require('../app');
const Request = require('../models/requestModel');
const Product = require('../models/ProductModel');
const Transaction = require('../models/TransactionModel');

//make transaction
exports.makeTransaction = async(req, res) => {
  const { OwnerId, UserId, ProductId, Type, Amount} = req.body;
  try {
    const request = await Transaction.create({ OwnerId, UserId, ProductId, Type, Amount});

    res.status(201).json(request);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to send request' });
  }
};

//get all users transaction
exports.getTransactions = async(req, res) => {//
  const { userId } = req.params;
  
  try {
    if(userId){
      const requests = await Transaction.findAll({ 
          where: { UserId: userId },
          include: Product
      });
      res.status(200).json(requests);
    }
    else{
      res.status(401).json("user is undefined");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

//get  users personal items transaction
exports.getItemTransactions = async(req, res) => {//
  const { userId } = req.params;
  try {
    if(userId){
      const requests = await Transaction.findAll({ 
          where: { OwnerId: userId },
          include: Product
      });
      res.status(200).json(requests);
    }
    else{
      res.status(401).json("user is undefined");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};


// Send a request
exports.makeRequest =  async (req, res) => {
  const { senderId, receiverId, type, ProductId } = req.body;
  try {
    const request = await Request.create({ senderId, receiverId, type , ProductId});

    // // Notify the specific connected client about the new request
    // const receiverSocket = clients.get(receiverId);
    // if (receiverSocket && receiverSocket.readyState === WebSocket.OPEN) {
    //   receiverSocket.send(JSON.stringify({ type: 'new_request', request }));
    // }

    res.status(201).json(request);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to send request' });
  }
};

// Get all requests for a seller
exports.getAllRequest = async (req, res) => {
  const { userId } = req.params;
  try {
    const requests = await Request.findAll({ 
        where: { 
          receiverId: userId,
          status: 'pending'
         },
        include: Product
     });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
};

// Get all requests for a user
exports.getAllItemRequest = async (req, res) => {
    const { userId } = req.params;
    try {
      const requests = await Request.findAll({ 
          where: { senderId: userId },
          include: Product
       });
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch requests' });
    }
  };

// Accept or reject a request
exports.handelRequest = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;
  try {
    const request = await Request.findByPk(requestId);
    if (request) {
      request.status = status;
      await request.save();
      res.status(200).json(request);
    } else {
      res.status(404).json({ error: 'Request not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to respond to request' });
  }
};

//remove request 
exports.handelRemoveRequest = async (req, res) => {
  const { requestId } = req.params;
  try {
      await Request.destroy({
        where: { id: requestId }
      });
      res.status(200).json({status:'removed successfully!'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to respond to request' });
  }
};



