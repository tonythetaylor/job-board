import React, { useState } from "react";
import JobDataService from "../services/JobService";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";

const AddJob = () => {
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
  const [job, setJob] = useState(initialJobState);
  const [submitted, setSubmitted] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const handleInputChange = event => {
    const { name, value } = event.target;
    setJob({ ...job, [name]: value });
  };

  const saveJob = () => {
    var data = {
      req_id: job.req_id,
      title: job.title,
      description: job.description,
      location: job.location,
      applied_on: job.applied_on,
      status: job.status,
      comments: job.comments,
      hiring_manager: job.hiring_manager,
    };

    JobDataService.create(data)
      .then(response => {
        setJob({
          id: response.data.id,
          req_id: response.data.req_id,
          title: response.data.title,
          description: response.data.description,
          location: response.data.location,
          applied_on: response.data.applied_on,
          status: response.data.status,
          comments: response.data.comments,
          hiring_manager: response.data.hiring_manager,
          published: response.data.published
        });
        setSubmitted(true);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newJob = () => {
    setJob(initialJobState);
    setSubmitted(false);
  };

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newJob}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="req_id">Req ID</label>
            <input
              type="text"
              className="form-control"
              id="req_id"
              required
              value={job.req_id}
              onChange={handleInputChange}
              name="req_id"
            />
          </div>

          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={job.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={job.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              id="location"
              required
              value={job.location}
              onChange={handleInputChange}
              name="location"
            />
          </div>

          <div className="form-group">
            <label htmlFor="applied_on">Applied On</label>
            <br />
            <DatePicker 
              id="applied_on"
              required
              className="form-control"
              name="applied_on"
              selected={startDate} 
              onChange={date => setStartDate(date)}
              value={job.applied_on = startDate}/>
            {/* <input
              type="text"
              className="form-control"
              id="applied_on"
              required
              value={job.applied_on = startDate}
              onChange={handleInputChange}
              name="applied_on"
            /> */}
          </div>

          <div className="form-group">
            <label htmlFor="status">App Status</label>
            <input
              type="text"
              className="form-control"
              id="status"
              required
              value={job.status}
              onChange={handleInputChange}
              name="status"
            />
          </div>

          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <input
              type="text"
              className="form-control"
              id="comments"
              required
              value={job.comments}
              onChange={handleInputChange}
              name="comments"
            />
          </div>

          <div className="form-group">
            <label htmlFor="hiring_manager">Hiring Manager</label>
            <input
              type="text"
              className="form-control"
              id="hiring_manager"
              required
              value={job.hiring_manager}
              onChange={handleInputChange}
              name="hiring_manager"
            />
          </div>

          <button onClick={saveJob} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default AddJob;
