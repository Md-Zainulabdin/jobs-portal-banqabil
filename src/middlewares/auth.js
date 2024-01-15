import jwt from "jsonwebtoken"

function auth(req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).send({ error: "Authorization failed." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        return next();

    } catch (error) {
        console.log("auth-middleware-error", error);
        return res.status(400).send({ error: 'Token is invalid.' })
    }
}

export default auth;