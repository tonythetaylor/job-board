import React, { useState, useEffect } from "react";
import JobDataService from "../services/JobService";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { DateTime } from 'luxon';

const dt = DateTime.local();

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  

  useEffect(() => {
    retrieveJobs();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const retrieveJobs = () => {
    JobDataService.getAll()
      .then(response => {
        setJobs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveJobs();
    setCurrentJob(null);
    setCurrentIndex(-1);
  };

  const setActiveJob = (job, index) => {
    setCurrentJob(job);
    setCurrentIndex(index);
  };

  const removeAllJobs = () => {
    JobDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    JobDataService.findByTitle(searchTitle)
      .then(response => {
        setJobs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Jobs List</h4>

        <ul className="list-group">
          {jobs &&
            jobs.map((job, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveJob(job, index)}
                key={index}
              >
                {job.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllJobs}
        >
          Remove All
        </button>
      </div>
      <div className="col-md-6">
        {currentJob ? (
          <div>
            <h4>Job</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {currentJob.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {currentJob.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentJob.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/jobs/" + currentJob.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Job...</p>
            <p>-or-</p>
            <CSVLink 
              data={jobs}
              filename={`job_list_${dt}.csv`}
              className="btn btn-primary"
              target="_blank"
              >
                Download Jobs
            </CSVLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsList;
