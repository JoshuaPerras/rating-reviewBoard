import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get the token from `Authorization: Bearer <token>`
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded payload to req.user
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

export default authenticate;
