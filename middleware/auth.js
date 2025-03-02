// middleware/auth.js

export const verifyToken = (req, res, next) => {
    // Logic for verifying JWT or token from request headers
    const token = req.header("Authorization");

    if (!token) {
        return res.status(403).json({ message: "Access Denied" });
    }

    try {
        // Token verification logic (e.g., using JWT)
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: "Invalid Token" });
    }
};
