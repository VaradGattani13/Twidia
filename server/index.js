
// import bodyparser from 'body-parser'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet';
import multer from 'multer';
import morgan from 'morgan';
import {fileURLToPath} from 'url'
import path from 'path'
import express from 'express'
import bodyParser from 'body-parser';
import userRoutes from './routes/users.js'
import {register} from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import { verifyToken } from './middlewares/auth.js';
import {createPost} from './controllers/posts.js';
import User from './models/User.js';
import Post from './models/Post.js';
import {users,posts} from './data/index.js';


mongoose.set('strictQuery', true)


// Configurations
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
dotenv.config();
const app=express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan('common'));
app.use(bodyParser.json({limit:"30mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());
app.use("/assets",express.static(path.join(__dirname,'public/assets')));







// File Storage
const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,'public/assets');

    },
filename:function(req,file,cb){
    cb(null,file.originalname);

}
});


// Routes with files
const upload=multer({storage});
app.post('/auth/register',upload.single('picture'),register);
app.post('/posts',verifyToken,upload.single('picture'),createPost);



//Routes
app.use('/auth',authRoutes);
app.use('/users',userRoutes);
app.use("/posts",postRoutes)





//Mongoose Setup
const PORT=process.env.PORT||8001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=>console.log(`Server Running at ${PORT} `));

    // Updating Initial Info Manulally one time;
    // ek baar krdiya isliye comment krdiya
    // User.insertMany(users);
    // Post.insertMany(posts);



}).catch((e)=>console.log(`${e} did not connect`));

