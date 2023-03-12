//creating our own middleware

module.exports.setFlash = function(req,res,next){
    // set the flash message to locals
    res.locals.flash = {
        'success' : req.flash('success'),
        'error' : req.flash('error')
    }

    //now pass these to next
    next();
}