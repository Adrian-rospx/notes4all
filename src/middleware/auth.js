import jwt from "jsonwebtoken";

export function requireAuth(req, res, next) {
    const header_token = req.headers.authorization;
    
    if (!header_token)
        return res.status(401).send("Error: Missing authorization header");

    try {
        req.user = jwt.verify(header_token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(401).send("Invalid or expired token");
    }
};
