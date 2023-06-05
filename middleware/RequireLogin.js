const jwt = require("jsonwebtoken");

function RequireLogin(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "verySecretValue");
    const userId = decodedToken._id;
    console.log(decodedToken);
    req.auth = {
      userId: userId,
    };
    return next();
  } catch (error) {
    res.status(401).json({ error });
  }

 
}

 function verifyAccessToken(req, res, next) {
  if (!req.headers["authorization"]) return next(createError.Unauthorized());
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  JWT.verify(token, "verySecretValue", (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(createError.Unauthorized(message));
    }
    req.payload = payload;
    next();
  });
}

module.exports = RequireLogin;
