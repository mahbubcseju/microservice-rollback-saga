const config = require('../../const');
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
var sqs = new AWS.SQS({apiVersion: '2012-11-05'});



exports.savePost = function(req, res) {
  res.send("Happy bara");
};

exports.getBestContributor = function(req, res) {
    
    var params = {
       MessageAttributes: {
            "Title": {
                DataType: "String",
                StringValue: "The Whistler"
            },
            "Author": {
                DataType: "String",
                StringValue: "John Grisham"
            },
            "WeeksOn": {
                DataType: "Number",
                StringValue: "6"
            }
       },
       MessageBody: "Message Send",
       QueueUrl: config.SQS_QUEUE_URL
     };

     sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            res.send({
                data: "send Data",
            })
        }
    });

};

exports.increaseValue = function(req, res) {
    var params = {
       MessageAttributes: {
            "email": {
                DataType: "String",
                StringValue: req.body.email
            },
            "value": {
                DataType: "Number",
                StringValue: req.body.value
            }
       },
       MessageBody: "Increase",
       QueueUrl: config.SQS_QUEUE_URL
     };

     sqs.sendMessage(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            res.send({
                data: "Success",
            })
        }
    });

};