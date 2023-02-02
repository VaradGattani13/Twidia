import express from  'express';
import { verify } from 'jsonwebtoken';
import {getFeedPosts,getUserPosts,likePosts} from '../controllers/posts.js';
import { verifyToken } from '../middlewares/auth.js';


const router=express.Router();
// Reading

router.get('/',verifyToken,getUserPosts);
router.get('/:userId/posts',verifyToken,getUserPosts);



// Updating
router.patch('/:id/like',verifyToken,likePosts);






export default router;
