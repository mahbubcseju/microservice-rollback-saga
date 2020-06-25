const config = require('../../const');
const AWS = require('aws-sdk');
const Items = require('../models')
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const queueURL = config.USER_SERVICE;
AWS.config.update({region: 'ap-northeast-1'});

var params = {
    AttributeNames: [
        "SentTimestamp"
    ],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: [
        "All"
    ],
    QueueUrl: queueURL,
    VisibilityTimeout: 30,
    WaitTimeSeconds: 0
};

exports.getAllOrders = async (req, res) => {
    Items.find({}, function(err, response){
        res.send(response);
    })
};
