const config = require('../../const');
const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});
const Utils = require('../Services/utils')

exports.generateUniqueId = () => {
    return Date.now();
}

exports.sendMessageToUser = (data) => {
    var params = {
        MessageBody: JSON.stringify(data),
        QueueUrl: config.USER_SERVICE
     };
     sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success");
        }
    });
}

exports.sendMessageToOrder = (data) => {
    var params = {
        MessageBody: JSON.stringify(data),
        QueueUrl: config.ORDER_SERVICE
     };
     sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            console.log("Success");
        }
    });
}