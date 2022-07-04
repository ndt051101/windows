import axios from "../axios";

const handleLogin = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (id) => {
  return axios.get(`/api/get-all-users?id=${id}`);
};
const getAllCustomers = (id) => {
  return axios.get(`/api/get-all-customers?id=${id}`);
};

const getAllCodeServices = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};

const createNewUserService = (data) => {
  console.log("Data: ", data);
  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (id) => {
  return axios.delete("/api/delete-user", {
    data: {
      id: id,
    },
  });
};

const editUserService = (data) => {
  return axios.put("/api/edit-user", data);
};

const postCustomerBookAppointment = (data) => {
  return axios.post(`/api/customer-book-appointment`, data);
};

const postVerifyBookAppointment = (data) => {
  return axios.post(`/api/verify-book-appointment`, data);
};

const createNewProduct = (data) => {
  return axios.post(`/api/create-new-product`, data);
};
const getAllProduct = () => {
  return axios.get(`/api/get-product`);
};

const getDetailProductById = (id) => {
  return axios.get(`/api/get-detail-product-by-id?id=${id}`);
};
const getProductByTechnologyId = (id) => {
  return axios.get(`/api/get-product-by-technologyid?id=${id}`);
};

const editProductService = (data) => {
  return axios.put("/api/edit-product", data);
};

const deleteProductService = (id) => {
  return axios.delete("/api/delete-product", {
    data: {
      id: id,
    },
  });
};

const createNewProject = (data) => {
  return axios.post(`/api/create-new-project`, data);
};
const getAllProject = () => {
  return axios.get(`/api/get-project`);
};

const editProjectService = (data) => {
  return axios.put("/api/edit-project", data);
};

const deleteProjectService = (id) => {
  return axios.delete("/api/delete-project", {
    data: {
      id: id,
    },
  });
};

const getDetailProjectById = (id) => {
  return axios.get(`/api/get-detail-project-by-id?id=${id}`);
};

const createNewTechnology = (data) => {
  return axios.post(`/api/create-new-technology`, data);
};

const getAllTechnology = () => {
  return axios.get(`/api/get-technology`);
};
const getTwoTechnology = () => {
  return axios.get(`/api/get-two-technology`);
};

const editTechnologyService = (data) => {
  return axios.put("/api/edit-technology", data);
};

const deleteTechnologyService = (id) => {
  return axios.delete("/api/delete-technology", {
    data: {
      id: id,
    },
  });
};

const getDetailTechnologyById = (id) => {
  return axios.get(`/api/get-detail-technology-by-id?id=${id}`);
};

const createNewPosts = (data) => {
  return axios.post(`/api/create-new-posts`, data);
};

const getAllPosts = () => {
  return axios.get(`/api/get-posts`);
};
const getTwoPosts = () => {
  return axios.get(`/api/get-two-posts`);
};

const editPostsService = (data) => {
  return axios.put("/api/edit-posts", data);
};

const deletePostsService = (id) => {
  return axios.delete("/api/delete-posts", {
    data: {
      id: id,
    },
  });
};

const getDetailPostsById = (id) => {
  return axios.get(`/api/get-detail-posts-by-id?id=${id}`);
};


const postSendRemedy = (data) => {
  return axios.post(`/api/send-remedy`, data);
};

export {
  handleLogin,
  getAllUsers,
  getAllCustomers,
  getAllCodeServices,
  createNewUserService,
  deleteUserService,
  editUserService,
  postCustomerBookAppointment,
  postVerifyBookAppointment,
  createNewProduct,
  getAllProduct,
  getDetailProductById,
  getProductByTechnologyId,
  editProductService,
  deleteProductService,
  createNewProject,
  getAllProject,
  editProjectService,
  deleteProjectService,
  getDetailProjectById,
  createNewTechnology,
  getAllTechnology,
  getTwoTechnology,
  editTechnologyService,
  deleteTechnologyService,
  getDetailTechnologyById,
  createNewPosts,
  getAllPosts,
  getTwoPosts,
  editPostsService,
  deletePostsService,
  getDetailPostsById,
  postSendRemedy,
};
