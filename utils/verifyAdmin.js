const { verifyToken } = require('./verifyToken');



exports.verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role) {
      next();
    } else {
      return res.status(403).json({message: "You are not authorized!"});
    }
  });
};

exports.verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role == 'ADMIN') {
      next();
    } else {
      return res.status(403).json({message:"You are not an admin!"});
    }
  });
};

exports.verifyDriver = (req,res,next) => {
  verifyToken(req,res, () => {
    if(req.user.role == 'DRIVER') {
      next();
    } else {
      return res.status(403).json({message:"You are not a Driver"});
    }
  });
};