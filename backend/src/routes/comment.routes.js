import { Router } from "express";
import jwtVerify from "../middleware/jwtVerify.middleware.js";
import {addComment} from "../controller/comment.controller.js"
import { deleteComment}  from "../controller/comment.controller.js"
import {allCommentOfUser} from "../controller/comment.controller.js"
export const commentRouter = Router();
commentRouter.route("/add").post(jwtVerify, addComment)
commentRouter.route("/delete/:_id").post(jwtVerify, deleteComment)
commentRouter.route("/getAllComment/:id").get(allCommentOfUser)