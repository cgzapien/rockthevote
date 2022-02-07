const express = require("express")
const IssueRouter = express.Router()
const Issue = require("../models/Issue")
const ObjectId = require("mongodb").ObjectId
const jwt = require("jsonwebtoken")

//get all issues
IssueRouter.route("/")
  .get((req, res, next) => {
    Issue.find((err, issues) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issues)
    })
  })
//get all issues by user id
IssueRouter.route("/user")
  .get((req, res, next) => {
    const { _id } = req.user
    console.log('_id: ', _id);

    Issue.find({ user: _id }, (err, issues) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issues)
    })
  })
//post new issue by user
IssueRouter.route("/")
  .post((req, res, next) => {
    req.body.user = req.user._id
    const newIssue = new Issue(req.body)
    newIssue.save((err, savedIssued) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(savedIssued)
    })
  })
//get user issue by id
IssueRouter.get("/:issueId", (req, res, next) => {
  Issue.findById(req.params.issueId, (err, todo) => {
      if (err) {
          res.status(500);
          return next(err);
      } else if (!todo) {
          res.status(404)
          return next(new Error("No issue item found."));
      }
      return res.send(todo);
  });
});
//update user issue by id
IssueRouter.route("/:issueId")
  .put((req, res, next) => {
    Issue.findOneAndUpdate(
      { _id: req.params.issueId, user: req.user._id },
      req.body,
      { new: true },
      (err, updatedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedIssue)
      }
    )
  })
//delete user issue by id
IssueRouter.route("/:issueId")
  .delete((req, res, next) => {
    Issue.findOneAndDelete(
      { _id: req.params.issueId, user: req.user._id },
      (err, deletedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(deletedIssue)
      }
    )
  })
//---INCREMENT LIKE ON ISSUE---//
IssueRouter.route("/like/:issueId")
  .put((req, res, next) => {
    const userId = req.user._id
    Issue.findOneAndUpdate(
      { _id: req.params.issueId },
      { $push: { votedUser: userId  },
        $inc: { likes: 1 }
      },
      { new: true },
      (err, updatedIssue) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(201).send(updatedIssue)
      }
    )
  })
  //---INCREMENT DISLIKE ON ISSUE---//
  IssueRouter.route("/dislike/:issueId")
    .put((req, res, next) => {
      const userId = req.user._id 
      console.log(userId)
      Issue.findOneAndUpdate(
        { _id: req.params.issueId },
        { $push: { votedUser: userId  },
          $inc: { dislikes: 1 }
        },
        { new: true },
        (err, updatedIssue) => {
          if(err){
            res.status(500)
            return next(err)
          }
          return res.status(201).send(updatedIssue)
        }
      )
    })
  
  module.exports = IssueRouter