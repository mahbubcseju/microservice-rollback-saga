const config = require('../../const');
var AWS = require('aws-sdk');
const service = require('../services');
AWS.config.update({region: 'ap-northeast-1'});

var sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = config.SQS_QUEUE_URL;

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

exports.get_user_balance = function(req, res) {
    sqs.receiveMessage(params, function(err, data) {
        if (err) {
            console.log("Receive Error", err);
        } 
        else {
            if(data.Messages) {
                data.Messages.forEach( message => {
                    if ( message.Body == "Increase") {
                        service.increase(message.MessageAttributes);
                    }
                    else {

                    }
                    var deleteParams = {
                        QueueUrl: queueURL,
                        ReceiptHandle: message.ReceiptHandle
                    };
                    sqs.deleteMessage(deleteParams, function(err, data) {
                        if (err) {
                            console.log("Delete Error", err);
                        } else {
                            console.log("Message Deleted", data);
                        }
                    });
                });
            }
            console.log(data.Messages);
            res.send({
                "data": "message sent"
            });
        }
    });
};

exports.getBestContributor = function(req, res) {
    sqs.receiveMessage(params, function(err, data) {
        if (err) {
            console.log("Receive Error", err);
        } 
        else {
            data.Messages.forEach( message => {
                if ( message.Body == "Increase") {

                }
                else {

                }

                var deleteParams = {
                    QueueUrl: queueURL,
                    ReceiptHandle: message.ReceiptHandle
                };
                sqs.deleteMessage(deleteParams, function(err, data) {
                    if (err) {
                        console.log("Delete Error", err);
                    } else {
                        console.log("Message Deleted", data);
                    }
                });
            });

        }
    });
};
