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

exports.increaseItemStock = async (req, res) => {
    let entry = await Items.find({name: data.name.StringValue});
    if (entry.length)　{
        Items.findOneAndUpdate({
            name: data.name.StringValue
        },{ 
            $inc : { 
                count: parseInt(data.count.StringValue)
            }
        },{ 
            new: true 
        },
        function(err, response ){
            console.log(response);
        });
    }else {
        Items.create({
            name: data.name.StringValue,
            count: data.count.StringValue
        }, function(err, response){
            console.log('User created');
        });
    }
};
