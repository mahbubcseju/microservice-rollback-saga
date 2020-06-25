const config = require('../../const');
const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const Utils = require('../Services/utils')
const request = require('request');


exports.orderItem = function(req, res) {
    try {
        const orderId = Utils.generateUniqueId();
        const dataOrder = {
            'topics': 'addOrder',
            'id': orderId,
            'name': req.body.productName,
            'count': req.body.value
        }
        Utils.sendMessageToOrder(dataOrder);

        const dataUser = {
            'topics': 'deductBalance',
            'id': orderId,
            'email': req.body.email,
            'value': req.body.value
        }
        Utils.sendMessageToUser(dataUser);
        res.send({
            "Data": "Successfully message sent"
        });
    }catch {
        res.status(500).send({
            "message": "Server Error"
        });
    }
   
};

exports.increaseBalance = function(req, res) {
    const data = {
        'topics': 'increaseBalance',
        'id': Utils.generateUniqueId,
        'email': req.body.email,
        'value': req.body.value
    }
    Utils.sendMessageToUser(data);
    res.send({
        data: 'success'
    });
};

exports.getAllOrder = function(req, res) {
    const url = config.ORDER_SERVER + "/get/all/orders";
    request(url, 
        { json: true }, 
        (err, result, body) => {
            if (err) { 
                res.status(500).send({
                    "Message": "Server Error"
                });
             }
            res.send({
                data: body
            });
        }
    );
}

exports.getUserBalance = function(req, res) {
    try {
        const url = config.USER_SERVER + "/user/balance/" + req.params.email;
        request(url, 
            { json: true }, 
            (err, result, body) => {
                if (err) { 
                    res.status(500).send({
                        "Message": "Server Error"
                    });
                 }
                res.send({
                    data: body
                });
            }
        );

    }catch {
        res.status(500).send({
            "message": "Server Error"
        });
    }
}