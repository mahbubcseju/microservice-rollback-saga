var User = require('../models')

exports.increase = async (data) => {
    let entry = await User.find({email: data.email.StringValue});
    if (entry.length)　{
        User.findOneAndUpdate({
            email: data.email.StringValue
        },{ 
            $inc : { 
                value: parseInt(data.value.StringValue)
            }
        },{ 
            new: true 
        },
        function(err, response ){
            console.log(response);
        });
    }else {
        User.create({
            email: data.email.StringValue,
            value: data.value.StringValue
        }, function(err, response){
            console.log('User created');
        });
    }
}

exports.decrease = async (data) => {
    let entry = await User.find({email: data.email.StringValue});
    if (entry.length)　{
        User.findOneAndUpdate({
            email: data.email.StringValue
        },{ 
            $inc : { 
                value: - parseInt(data.value.StringValue)
            }
        },{ 
            new: true 
        },
        function(err, response ){
            console.log(response);
        });
    }else {
        User.create({
            email: data.email.StringValue,
            value: data.value.StringValue
        }, function(err, response){
            console.log('User created');
        });
    }
}
