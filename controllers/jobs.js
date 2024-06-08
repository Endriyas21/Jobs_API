const { NotBeforeError } = require("jsonwebtoken");
const { BadRequestError } = require("../errors");
const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({ createdBy: req.user.userID }).sort(
    "createdAt"
  );
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async (req, res) => {
  const {
    user: { userID },
    params: { id: jobId },
  } = req;
  const job = await Job.findOne({ _id: jobId, createdBy: userID });
  res.send("login user");
};

const createJob = async (req, res) => {
  req.body.createdBy = req.body.userID;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  res.send("login user");
};

const deleteJob = async (req, res) => {
  res.send("login user");
};

module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
