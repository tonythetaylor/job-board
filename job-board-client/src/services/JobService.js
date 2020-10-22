import http from "../http-common";

const getAll = (params) => {
  return http.get("/jobs", {params});
};

const get = id => {
  return http.get(`/jobs/${id}`);
};

const create = data => {
  return http.post("/jobs", data);
};

const update = (id, data) => {
  return http.put(`/jobs/${id}`, data);
};

const remove = id => {
  return http.delete(`/jobs/${id}`);
};

const removeAll = () => {
  return http.delete(`/jobs`);
};

const findByTitle = title => {
  return http.get(`/jobs?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};
