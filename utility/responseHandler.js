const resHandler = (res, body) => {
    res.status(body.status_code).json({data: body}); 
};
    
module.exports = resHandler;