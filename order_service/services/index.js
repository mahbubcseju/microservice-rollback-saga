const config = require('../../const');
const AWS = require('aws-sdk');
const service = require('../services');
const Items = require('../models');
const { increase } = require('../../user_service/Services');

AWS.config.update({region: 'ap-northeast-1'});
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

var queueURL = config.ORDER_SERVICE;

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


const addOrder = async (data) => {
    console.log(data);
    Items.create({
        id: data.id,
        name: data.name,
        count: data.count
    }, function(err, response){
        if(err){
            console.log(err);
        }else {
            console.log('Item created');
        }
    });
}

const deleteOrder = async (data) => {
    Items.deleteOne({ orderId: data.id }, function(err){
        if(err)console.log(err);
        else {
            console.log('Successfully deleted');
        }
    });
}

module.exports = async () => {
    console.log("Long Polling!!!")
    try {
        let data = await sqs.receiveMessage(params).promise();
        while(data.Messages != undefined){
            data.Messages.forEach( message => {
                const parseData = JSON.parse(message.Body);
                if ( parseData .topics === "addOrder") {
                    addOrder(parseData );
                }
                else {
                    deleteOrder(parseData );
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
