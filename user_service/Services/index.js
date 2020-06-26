const config = require('../../const');
var AWS = require('aws-sdk');
const service = require('../services');
AWS.config.update({region: 'ap-northeast-1'});
const User = require('../models');
const { CodePipeline } = require('aws-sdk');

const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

const queueURL = config.USER_SERVICE;

const params = {
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


const sendMessageToOrder = (data) => {
    data.topics = "cancelOrder";
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

const increaseBalance = async (data) => {
    let entry = await User.find({email: data.email});
    console.log(entry);
    if (entry.length)　{
        User.findOneAndUpdate({
            email: data.email
        },{ 
            $inc : { 
                value: parseInt(data.value)
            }
        },{ 
            new: true 
        },
        function(err, response ){
            console.log(response);
        });
    }else {
        User.create({
            email: data.email,
            value: data.value
        }, function(err, response){
            console.log('User created');
        });
    }
}

const decreaseBalance = async (data) => {
    let entry = await User.findOne({email: data.email});
    console.log(entry);
    if (entry && entry.value >= parseInt(data.value))　{
        User.findOneAndUpdate({
            email: data.email
        },{ 
            $inc : { 
                value: -parseInt(data.value)
            }
        },{ 
            new: true 
        },
        function(err, response ){
            console.log(response);
        });
    }else {
        sendMessageToOrder(data);
    }
}

exports.clearQueue  = async () => {
    try {
        let data = await sqs.receiveMessage(params).promise();
        while(data.Messages != undefined){
            data.Messages.forEach( message => {
                const data = JSON.parse(message.Body);
                if ( data.topics === "deductBalance") {
                    decreaseBalance(data);
                }
                else {
                    increaseBalance(data);
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

