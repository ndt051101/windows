import actionTypes from "./actionTypes";
import {
  getAllCodeServices,
  createNewUserService,
  getAllUsers,
  getAllCustomers,
  deleteUserService,
  editUserService,
  getAllTechnology,
  editTechnologyService,
  deleteTechnologyService,
  editPostsService,
  deletePostsService,
  getAllPosts,
  getAllProject,
  editProjectService,
  deleteProjectService,
  getAllProduct,
  editProductService,
  deleteProductService,
} from "../../services/userService";
import { toast } from "react-toastify";

//Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });

      const res = await getAllCodeServices("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });

      const res = await getAllCodeServices("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      const res = await getAllCodeServices("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoLeFailed());
      }
    } catch (error) {
      dispatch(fetchRoLeFailed());
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoLeFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

// Create Posts
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (error) {
      dispatch(saveUserFailed());
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

// Fetch All Users
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      dispatch(fetchAllUsersFailed());
    }
  };
};



export const fetchAllUsersSuccess = (data) => ({
  type: "FETCH_ALL_USERS_SUCCESS",
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: "FETCH_ALL_USERS_FAILED",
});

export const fetchAllCustomersStart = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllCustomers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllCustomersSuccess(res.customers.reverse()));
      } else {
        dispatch(fetchAllCustomersFailed());
      }
    } catch (error) {
      dispatch(fetchAllCustomersFailed());
    }
  };
};

export const fetchAllCustomersSuccess = (data) => ({
  type: "FETCH_ALL_CUSTOMERS_SUCCESS",
  customers: data,
});

export const fetchAllCustomersFailed = () => ({
  type: "FETCH_ALL_CUSTOMERS_FAILED",
});

//Delete user
export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      const res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("DELETE A USER SUCCESS!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("DELETE A USER FAILED!");
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      dispatch(deleteUserFailed());
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success("UPDATE A USER SUCCESS!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("UPDATE A USER FAILED!");
        dispatch(editUserFailed());
      }
    } catch (error) {
      dispatch(editUserFailed());
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});


export const fetchAllPosts = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllPosts("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllPostsSuccess(res.data.reverse()));
      } else {
        dispatch(fetchAllPostsFailed());
      }
    } catch (error) {
      dispatch(fetchAllPostsFailed());
    }
  };
};

export const fetchAllPostsSuccess = (data) => ({
  type: "FETCH_ALL_POSTS_SUCCESS",
  data: data,
});

export const fetchAllPostsFailed = () => ({
  type: "FETCH_ALL_POSTS_FAILED",
});

export const editAPosts = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await editPostsService(data);
      if (res && res.errCode === 0) {
        toast.success("UPDATE A POSTS SUCCESS!");
        dispatch(editPostsSuccess());
        dispatch(fetchAllPosts());
      } else {
        toast.error("UPDATE A POSTS FAILED!");
        dispatch(editPostsFailed());
      }
    } catch (error) {
      dispatch(editPostsFailed());
    }
  };
};

export const editPostsSuccess = () => ({
  type: actionTypes.EDIT_POSTS_SUCCESS,
});

export const editPostsFailed = () => ({
  type: actionTypes.EDIT_POSTS_FAILED,
});

export const deleteAPosts = (userId) => {
  return async (dispatch, getState) => {
    try {
      const res = await deletePostsService(userId);
      if (res && res.errCode === 0) {
        toast.success("DELETE A POSTS SUCCESS!");
        dispatch(deletePostsSuccess());
        dispatch(fetchAllPosts());
      } else {
        toast.error("DELETE A POSTS FAILED!");
        dispatch(deletePostsFailed());
      }
    } catch (error) {
      dispatch(deletePostsFailed());
    }
  };
};

export const deletePostsSuccess = () => ({
  type: actionTypes.DELETE_POSTS_SUCCESS,
});

export const deletePostsFailed = () => ({
  type: actionTypes.DELETE_POSTS_FAILED,
});

export const fetchAllProject = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllProject("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllProjectSuccess(res.data.reverse()));
      } else {
        dispatch(fetchAllProjectFailed());
      }
    } catch (error) {
      dispatch(fetchAllProjectFailed());
    }
  };
};

export const fetchAllProjectSuccess = (data) => ({
  type: "FETCH_ALL_PROJECT_SUCCESS",
  data: data,
});

export const fetchAllProjectFailed = () => ({
  type: "FETCH_ALL_PROJECT_FAILED",
});

export const editAProject = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await editProjectService(data);
      if (res && res.errCode === 0) {
        toast.success("UPDATE A PROJECT SUCCESS!");
        dispatch(editProjectSuccess());
        dispatch(fetchAllProject());
      } else {
        toast.error("UPDATE A PROJECT FAILED!");
        dispatch(editProjectFailed());
      }
    } catch (error) {
      dispatch(editProjectFailed());
    }
  };
};

export const editProjectSuccess = () => ({
  type: actionTypes.EDIT_PROJECT_SUCCESS,
});

export const editProjectFailed = () => ({
  type: actionTypes.EDIT_PROJECT_FAILED,
});

export const deleteAProject = (userId) => {
  return async (dispatch, getState) => {
    try {
      const res = await deleteProjectService(userId);
      if (res && res.errCode === 0) {
        toast.success("DELETE A PROJECT SUCCESS!");
        dispatch(deleteProjectSuccess());
        dispatch(fetchAllProject());
      } else {
        toast.error("DELETE A PROJECT FAILED!");
        dispatch(deleteProjectFailed());
      }
    } catch (error) {
      dispatch(deleteProjectFailed());
    }
  };
};

export const deleteProjectSuccess = () => ({
  type: actionTypes.DELETE_PROJECT_SUCCESS,
});

export const deleteProjectFailed = () => ({
  type: actionTypes.DELETE_PROJECT_FAILED,
});

export const fetchAllTechnology = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllTechnology("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllTechnologySuccess(res.data.reverse()));
      } else {
        dispatch(fetchAllTechnologyFailed());
      }
    } catch (error) {
      dispatch(fetchAllTechnologyFailed());
    }
  };
};

export const fetchAllTechnologySuccess = (data) => ({
  type: "FETCH_ALL_TECHNOLOGY_SUCCESS",
  data: data,
});

export const fetchAllTechnologyFailed = () => ({
  type: "FETCH_ALL_TECHNOLOGY_FAILED",
});

export const editATechnology = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await editTechnologyService(data);
      if (res && res.errCode === 0) {
        toast.success("UPDATE A TECHNOLOGY SUCCESS!");
        dispatch(editTechnologySuccess());
        dispatch(fetchAllTechnology());
      } else {
        toast.error("UPDATE A TECHNOLOGY FAILED!");
        dispatch(editTechnologyFailed());
      }
    } catch (error) {
      dispatch(editTechnologyFailed());
    }
  };
};

export const editTechnologySuccess = () => ({
  type: actionTypes.EDIT_TECHNOLOGY_SUCCESS,
});

export const editTechnologyFailed = () => ({
  type: actionTypes.EDIT_TECHNOLOGY_FAILED,
});

export const deleteATechnology = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await deleteTechnologyService(id);
      if (res && res.errCode === 0) {
        toast.success("DELETE A TECHNOLOGY SUCCESS!");
        dispatch(deleteTechnologySuccess());
        dispatch(fetchAllTechnology());
      } else {
        toast.error("DELETE A TECHNOLOGY FAILED!");
        dispatch(deleteTechnologyFailed());
      }
    } catch (error) {
      dispatch(deleteTechnologyFailed());
    }
  };
};

export const deleteTechnologySuccess = () => ({
  type: actionTypes.DELETE_TECHNOLOGY_SUCCESS,
});

export const deleteTechnologyFailed = () => ({
  type: actionTypes.DELETE_TECHNOLOGY_FAILED,
});









export const fetchAllProduct = () => {
  return async (dispatch, getState) => {
    try {
      const res = await getAllProduct("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllProductSuccess(res.data.reverse()));
      } else {
        dispatch(fetchAllProductFailed());
      }
    } catch (error) {
      dispatch(fetchAllProductFailed());
    }
  };
};

export const fetchAllProductSuccess = (data) => ({
  type: "FETCH_ALL_PRODUCT_SUCCESS",
  data: data,
});

export const fetchAllProductFailed = () => ({
  type: "FETCH_ALL_PRODUCT_FAILED",
});

export const editAProduct = (data) => {
  return async (dispatch, getState) => {
    try {
      const res = await editProductService(data);
      if (res && res.errCode === 0) {
        toast.success("UPDATE A PRODUCT SUCCESS!");
        dispatch(editProductSuccess());
        dispatch(fetchAllProduct());
      } else {
        toast.error("UPDATE A PRODUCT FAILED!");
        dispatch(editProductFailed());
      }
    } catch (error) {
      dispatch(editProductFailed());
    }
  };
};

export const editProductSuccess = () => ({
  type: actionTypes.EDIT_PRODUCT_SUCCESS,
});

export const editProductFailed = () => ({
  type: actionTypes.EDIT_PRODUCT_FAILED,
});

export const deleteAProduct = (id) => {
  return async (dispatch, getState) => {
    try {
      const res = await deleteProductService(id);
      if (res && res.errCode === 0) {
        toast.success("DELETE A PRODUCT SUCCESS!");
        dispatch(deleteProductSuccess());
        dispatch(fetchAllProduct());
      } else {
        toast.error("DELETE A PRODUCT FAILED!");
        dispatch(deleteProductFailed());
      }
    } catch (error) {
      dispatch(deleteProductFailed());
    }
  };
};

export const deleteProductSuccess = () => ({
  type: actionTypes.DELETE_PRODUCT_SUCCESS,
});

export const deleteProductFailed = () => ({
  type: actionTypes.DELETE_PRODUCT_FAILED,
});
