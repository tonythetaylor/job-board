import React, { useState, useEffect } from "react";
import JobDataService from "../services/JobService";
import DownloadDataService from "../services/DownloadService";

import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import { DateTime } from 'luxon';
import Pagination from "@material-ui/lab/Pagination";

const dt = DateTime.local();

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [currentJob, setCurrentJob] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [downloads, setDownloadJobs] = useState([]);

  // pagination 
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize, setPageSize] = useState(3);

  const pageSizes = [3, 6, 9];

  const onChangeSearchTitle = (e) => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const getRequestParams = (searchTitle, page, pageSize) => {
    let params = {};

    if (searchTitle) {
      params["title"] = searchTitle;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
  };

  const downloadJobs = () => {
    DownloadDataService.getAll()
      .then(response => {
        setDownloadJobs(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveJobs = () => {
    const params = getRequestParams(searchTitle.toUpperCase(), page, pageSize);
    
    JobDataService.getAll(params)
      .then((response) => {
        const { jobs, totalPages } = response.data;
        setJobs(jobs);
        setCount(totalPages);

        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(retrieveJobs, [page, pageSize]);
  useEffect(() => {
    downloadJobs();
  }, []);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(event.target.value);
    setPage(1);
  };


  // TODO: add back when auth is added
  // const refreshList = () => {
  //   downloadJobs();
  //   retrieveJobs();
  //   setCurrentJob(null);
  //   setCurrentIndex(-1);
  // };

  const setActiveJob = (job, index) => {
    setCurrentJob(job);
    setCurrentIndex(index);
  };

  // TODO: add back when auth is added 
  // const removeAllJobs = () => {
  //   JobDataService.removeAll()
  //     .then(response => {
  //       console.log(response.data);
  //       refreshList();
  //     })
  //     .catch(e => {
  //       console.log(e);
  //     });
  // };

  const toggleJobDetails = () => setCurrentJob(!currentJob);

  return (
    <div className="list row">
      <div className="col-md-12">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by job title"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
          <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveJobs}
            >
              Search
          </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Jobs List</h4>
        <hr />
        <div className="mt-3">
          {"Jobs per Page: "}
          <select onChange={handlePageSizeChange} value={pageSize}>
            {pageSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <Pagination
            className="my-3"
            count={count}
            page={page}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
            onChange={handlePageChange}
          />
        </div>

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
        {/* <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllJobs}
        >
          Remove All
        </button> */}
      </div>
      <div className="col-md-6">
        {currentJob ? (
          <div>
            <h4>Job Details</h4>
            <hr />
            <div>
              <label>
                <strong>Req ID:</strong>
              </label>{" "}
              {currentJob.req_id}
            </div>
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
                <strong>Location:</strong>
              </label>{" "}
              {currentJob.location}
            </div>
            <div>
              <label>
                <strong>Applied On:</strong>
              </label>{" "}
              {currentJob.applied_on}
            </div>
            <div>
              <label>
                <strong>App Status:</strong>
              </label>{" "}
              {currentJob.status}
            </div>
            <div>
              <label>
                <strong>Comments:</strong>
              </label>{" "}
              {currentJob.comments}
            </div>
            <div>
              <label>
                <strong>Hiring Manager:</strong>
              </label>{" "}
              {currentJob.hiring_manager}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {currentJob.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/jobs/" + currentJob.id}
              className="m-3 btn btn-sm btn-warning"
            >
              Edit
            </Link>
            <button
              className="m-3 btn btn-sm btn-primary"
              onClick={toggleJobDetails}
            >
              Clear Details
            </button>
          </div>
        ) : (
          <div>
            <h4>Job Details</h4>
            <hr />
            <br />
            <p className="job-details">Please click on a Job</p>
            <p className="job-details">-or-</p>
            <CSVLink 
              data={downloads}
              filename={`job_list_${dt}.csv`}
              className="btn btn-primary job-details-button"
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
