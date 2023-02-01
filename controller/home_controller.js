//export a function which will be publicly available to the route file
module.exports.home=function(req,res){                      //home, a name give to the function
    return res.end('<h1>Express is up for codeial</h1>');
};