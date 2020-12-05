import { getUser, deleteUser, createUser, findUsername } from '../../actions/users.actions';
import { toast } from 'react-toastify'

export const GET_USER_STARTED = 'GET_USER_STARTED'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'

export const FIND_USERNAME_STARTED = 'FIND_USERNAME_STARTED'
export const FIND_USERNAME_SUCCESS = 'FIND_USERNAME_SUCCESS'
export const FIND_USERNAME_ERROR = 'FIND_USERNAME_ERROR'

export const CREATE_USER_STARTED = 'CREATE_USER_STARTED'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR'

export const DELETE_USER_SUCCESS = 'DELETE_USERS_SUCCESS'
export const DELETE_USER_STARTED = 'DELETE_USERS_STARTED'
export const DELETE_USER_ERROR = 'DELETE_USERS_ERROR'

const usersActions = {

  getUser: (data) => async (dispatch) => {
    try {
      dispatch({
        type: GET_USER_STARTED,
      });
      await getUser(data)
      dispatch({
        type: GET_USER_SUCCESS,
      });
    } catch (error) {
      toast.error('ERROR GETTING USER' + error)
      dispatch({
        type: GET_USER_ERROR,
      });
    }
  },

  findUsername: (username) => async (dispatch) => {
    try {
      dispatch({
        type: FIND_USERNAME_STARTED,
      });
      await findUsername(username)
      dispatch({
        type: FIND_USERNAME_SUCCESS,
      });
    } catch (error) {
      toast.error('ERROR FINDING USERNAME' + error)
      dispatch({
        type: FIND_USERNAME_ERROR,
      });
    }
  },


  deleteUser: (data) => async (dispatch) => {
    try {
      dispatch({
        type: DELETE_USER_STARTED,
      });
      let response = await deleteUser(data);
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: {
          message: response.message,
          result: response.data,
        }
      });
    } catch (err) {
      dispatch({
        type: DELETE_USER_ERROR,
      })
    }
  },
  createUser: (data) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_USER_STARTED,
      });
      let response = await createUser(data);
      dispatch({
        type: CREATE_USER_SUCCESS,
        payload: {
          message: response.message,
          result: response.result,
        }
      });
    } catch (err) {
      dispatch({
        type: CREATE_USER_ERROR,
        payload: {
          message: 'failed to create account!',
        }
      })
    }
  }
};

export default usersActions;