const ADMIN=require('../module/login');
const Order=require('../module/order');
const Getintouch=require('../module/get');
const bcrypt=require('bcrypt')
const jwt=require('../controller/jwt');

exports.admin = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new ADMIN({
            email,
            password: hashedPassword
        });
        await newAdmin.save();
        res.json({ message: 'Admin signup successful' });
    } catch (err) {
        console.error('Error saving admin to database', err);
        res.status(500).json({ error: 'Error saving admin to database' });
    }
};

exports.adminlogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await ADMIN.findOne({ email });
        if (!admin) {
            console.log("Admin not found");
            return res.status(401).json({ error: 'Admin not found' });
        }
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            console.log("Password does not match");
            return res.status(401).json({ error: 'Authentication failed' });
        }
        const token=jwt.generateToken({email});
        console.log(token);
        res.json({ message: 'Login successful',token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: 'Login failed' });
    }
};

exports.order=async(req,res)=>{
    const { name,number,address,product,information } = req.body;
    try {
        if (!name||!number||!address||!product||!information) {
            return res.status(400).json({ error: 'All fields are required' });
        }
      //  const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Order({
           name,
           number,
           address,
           product,
           information
        });
        await newAdmin.save();
        res.json({ message: 'order create successful' });
    } catch (err) {
        console.error('Error saving admin to database', err);
        res.status(500).json({ error: 'Error saving admin to database' });
    }  
};
exports.orderget=async(req,res)=>{
    try{
        const order=await Order.find();
    
        return res.json({message:"dashboard retrived successfully",order})

    }catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch dashboard", error: err.message });
    }
}


exports.getintouch=async(req,res)=>{
    const { name,number,email,message } = req.body;
    try {
        if (!name||!number||!email||!message) {
            return res.status(400).json({ error: 'All fields are required' });
        }
      //  const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = new Getintouch({
           name,
           number,
           email,
           message
        });
        await newAdmin.save();
        res.json({ message: 'data saved successful' });
    } catch (err) {
        console.error('Error saving admin to database', err);
        res.status(500).json({ error: 'Error saving admin to database' });
    }  
}

exports.getintouchget=async(req,res)=>{
    try{
        const order=await Getintouch.find();
    
        return res.json({message:"dashboard retrived successfully",order})

    }catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to fetch dashboard", error: err.message });
    }
}