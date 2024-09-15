import jwt from 'jsonwebtoken'
import 'dotenv/config'
const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized Login Again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.SECRET_KEY);
        req.body.userId = token_decode.id;
        next();
    }
    catch (error) {
        console.log(error);
        return res.json({ success: false, message: "Error"});
    }
}

export default authMiddleware;