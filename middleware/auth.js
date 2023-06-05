const jwt = require("jsonwebtoken");
const createError = require("http-errors");


function signAccessToken(userId) {
  return new Promise((resolve, reject) => {
    const payload = { _id: userId };
    const secret = "verySecretValue";
    const options = {
      audience: userId,
    };
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.log(err.message);
        reject(createError.InternalServerError());
        return;
      }
      resolve(token);
    });
  });
}

 function auth(req, res, next) {
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

 function verifyRefreshToken(refreshToken) {
  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, "verySecretValue", (err, payload) => {
      if (err) return reject(createError.Unauthorized());
      const userId = payload.aud;
      client.GET(userId, (err, result) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
          return;
        }
        if (refreshToken === result) return resolve(userId);
        reject(createError.Unauthorized());
      });
    });
  });
}
module.exports = {
  auth,
}