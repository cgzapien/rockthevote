const express = require("express")
const CommentRouter = express.Router()
const Comment = require("../models/Comment")
const ObjectId = require("mongodb").ObjectId
// const Issue = require("../models/Issue")
// const jwt = require("jsonwebtoken")

//---create comments object---//--works
CommentRouter.route("/:issueId")
.post((req, res, next) => {
  req.body.issue = req.params.issueId,
  req.body.user = req.user._id
  const newComment = new Comment(req.body)
  newComment.save((err, savedIssued) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssued)
  })
})
//--- get comment by comment id --// --works
CommentRouter.route("/:commentId")
.get((req, res, next) => {
  Comment.findById(req.params.commentId, (err, comments) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})
//--- get all comments from all issues--// --works
CommentRouter.route("/")
  .get((req, res, next) => {
    Comment.find((err, comments) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(comments)
    })
})

//--- get all the comments for all issues by user---// --no working
CommentRouter.route("/user")
  .get((req, res, next) => {
    const { _id } = req.user
    console.log('id: ', _d);

    Comment.find({ user: _id }, (err, issues) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issues)
    })
  })
//---gets comments by issue id---// not working
CommentRouter.route("/issue/:issueId")
  .get((req, res, next) => {
    console.log(req.params.issueId)
    //req.body.issue = req.params.issueId
    Comment.find({"issue": ObjectId(req.params.issueId)}, (err, comments) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
  })
//---delete comment by id---// works
CommentRouter.route("/:commentId")
  .delete((req, res, next) => {
    console.log(req.params.commentId);
    Comment.findByIdAndDelete({_id: req.params.commentId}, (err, deletedComment) =>{
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(deletedComment)
    })
  })
//---update comment by id and by user who created comment---//works
CommentRouter.route("/:commentId")
  .put((req, res, next) => {
    Comment.findOneAndUpdate(
      { _id: req.params.commentId, user: req.user._id },
      req.body,
      { new: true },
      (err, updatedComment) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedComment)
    })
  })
module.exports = CommentRouter
//---add comment to a comments array---//
// CommentRouter.route("/:issueId")
//   .post((req, res, next) => {
//     const newCommentData = {...req.body, issue: req.params.issueId}
//     const newComment = new Comment(newCommentData)
//     Issue.findByIdAndUpdate(
//             req.params.issueId,
//             { $push: { comments: newComment } },
//             { new: true },
//             (err, createdComment) => {
//                 if(err){
//                     res.status(500)
//                     return next(err)
//                 }
//                 return res.status(201).send(createdComment)
//             })
//   })