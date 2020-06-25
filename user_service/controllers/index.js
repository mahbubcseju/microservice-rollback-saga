const config = require('../../const');
var AWS = require('aws-sdk');
const service = require('../services');
AWS.config.update({region: 'ap-northeast-1'});
const User = require('../models')

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

const clearQueue = async () => {
    try {
        let data = await sqs.receiveMessage(params).promise();
        while(data.Messages != undefined){
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
            data = await sqs.receiveMessage(params).promise();
        }

    }catch (err){
        console.log(err);
    }
}

exports.get_user_balance = function(req, res) {
    clearQueue();
    User.findOne({email: req.params.email }, function(err, response) {
        if(err) {
            res.status(500).send({
                'Error': 'Server Error'
            });
        }else {
            res.send({
                'data': response.value
            })
        }
    })
};

exports.getBestContributor = function(req, res) {
    
};
