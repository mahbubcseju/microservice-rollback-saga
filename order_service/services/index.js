const config = require('../../const');
const AWS = require('aws-sdk');
const service = require('../services');
const Items = require('../models')
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

AWS.config.update({region: 'ap-northeast-1'});
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


const decrease = async (data) => {
    let entry = await Items.find({email: data.name.StringValue});
    if (entry.length)　{
        Items.findOneAndUpdate({
            name: data.name.StringValue
        },{ 
            $inc : { 
                value: - parseInt(data.count.StringValue)
            }
        },{ 
            new: true 
        },
        function(err, response ){
            console.log(response);
        });
    }else {
        Items.create({
            email: data.name.StringValue,
            value: data.count.StringValue
        }, function(err, response){
            console.log('User created');
        });
    }
}

exports.clearQueue = async () => {
    try {
        let data = await sqs.receiveMessage(params).promise();
        while(data.Messages != undefined){
            data.Messages.forEach( message => {
                if ( message.Body == "Increase") {
                    
                }
                else {
                    decrease(message.MessageAttributes);
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
