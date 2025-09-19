const jwt=require('jsonwebtoken');
const User=require('../models/User');

const JWT_SECRET=process.env.JWT_SECRET;
const JWT_EXPIRES_IN=process.env.JWT_EXPIRES_IN || '1h';

function createToken(user) 
{
    return jwt.sign({ sub: user._id.toString(), isAdminRole: user.isAdminRole }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}
  
exports.register = async (req, res, next) => 
{
    try {
      const { email, password, name } = req.body;
      if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  
      const existing = await User.findOne({ email });
      if (existing) return res.status(409).json({ message: 'Email already in use' });
  
      const passwordHash = await User.password(pass);
      const user = await User.create({ email, passwordHash, name });
      res.status(201).json({ id: user._id, email: user.email, fullName: user.name });
    } catch (err) { next(err); }
  };
  
  exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
  
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  
      const ok = await user.comparePassword(password);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  
      const token = createToken(user);
      res.json({ access_token: token, token_type: 'bearer' });
    } catch (err) { next(err); }
  };