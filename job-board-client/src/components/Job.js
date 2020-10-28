import React, { useState, useEffect } from "react";
import JobDataService from "../services/JobService";
import { useHistory } from "react-router-dom";


const Job = props => {
  const initialJobState = {
    id: null,
    req_id: "",
    title: "",
    description: "",
    location: "",
    applied_on: "",
    status: "",
    comments: "",
    hiring_manager: "",
    published: false
  };
  const [currentJob, setCurrentJob] = useState(initialJobState);
  const [message, setMessage] = useState("");

  let history = useHistory();

  const getJob = id => {
    JobDataService.get(id)
      .then(response => {
        setCurrentJob(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    getJob(props.match.params.id);
  }, [props.match.params.id]);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentJob({ ...currentJob, [name]: value });
  };

  const updatePublished = status => {
    var data = {
      id: currentJob.id,
      title: currentJob.title,
      description: currentJob.description,
      published: status
    };

    JobDataService.update(currentJob.id, data)
      .then(response => {
        setCurrentJob({ ...currentJob, published: status });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const updateJob = () => {
    JobDataService.update(currentJob.id, currentJob)
      .then(response => {
        console.log(response.data);
        setMessage("The job was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const deleteJob = () => {
    JobDataService.remove(currentJob.id)
      .then(response => {
        console.log(response.data);
        props.history.push("/jobs");
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {currentJob ? (
        <div className="edit-form">
          <h4>Job Details</h4>
          <hr />
          <form>
            <div className="form-group">
              <label htmlFor="req_id">Req ID</label>
              <input
                type="text"
                className="form-control"
                id="req_id"
                name="req_id"
                value={currentJob.req_id}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentJob.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentJob.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                value={currentJob.location}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="applied_on">Applied On</label>
              <input
                type="text"
                className="form-control"
                id="applied_on"
                name="applied_on"
                value={currentJob.applied_on}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="comments">Comments</label>
              <input
                type="text"
                className="form-control"
                id="comments"
                name="comments"
                value={currentJob.comments}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="hiring_manager">Hiring Manager</label>
              <input
                type="text"
                className="form-control"
                id="hiring_manager"
                name="hiring_manager"
                value={currentJob.hiring_manager}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentJob.published ? "Published" : "Pending"}
            </div>
          </form>

          {currentJob.published ? (
            <button
              className="m-3 btn btn-sm btn-primary"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="m-3 btn btn-sm btn-primary"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button className="m-3 btn btn-sm btn-danger" onClick={deleteJob}>
            Delete
          </button>

          <button
            type="submit"
            className="m-3 btn btn-sm btn-success"
            onClick={updateJob}
          >
            Update
          </button>

          <button 
            className="m-3 btn btn-sm btn-secondary" 
            onClick={() => history.goBack()}
          >
            Go back
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <h4>Job Details</h4>
          <hr />
          <br />
          <p>Please click on a Job...</p>
        </div>
      )}
    </div>
  );
};

export default Job;
