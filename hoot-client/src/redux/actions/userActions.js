import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    LOADING_USER,
    SET_TODAYS_ACTIVITIES,
    SET_ACTIVE_DAYS,
    SET_ALL_USERS,
    SET_ALL_POSTS,
} from '../types';
import axios from 'axios';
import firebase from 'firebase/app';
import 'firebase/firestore';


export const getAllUsernames = () => (dispatch) => {
    return axios
    .get('/users')
    .then((response) => {
        const usernames = [];
        for (let i = 0; i < response.data.length; i++) {
            usernames.push(response.data[i].username)
        }
        usernames.sort();
        console.log('all usernames response data: ', usernames);
        // console.log(Array.isArray(usernames));
        dispatch({ 
            type: SET_ALL_USERS,
            payload: usernames
        });
        dispatch({ type: CLEAR_ERRORS });
        // return usernames;
    })
    .catch((err) => {
        console.log('sad');
        console.log(err.response);
        dispatch({
            type: SET_ERRORS,
            payload: err.response
        });
    });
}

export const getAllPosts= () => (dispatch) => {
    return axios
        .get('/posts')
        .then((response) => {
            const posts = [];
            for (let i = 0; i < response.data.length; i++) {
                posts.push(response.data[i])
            }
            posts.sort();
            console.log('all posts response data: ', posts);
            dispatch({ 
                type: SET_ALL_POSTS, 
                payload: posts });
            dispatch({ type: CLEAR_ERRORS });
            // return usernames;
        })
        .catch((err) => {
            console.log('sad');
            console.log(err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            });
        });
}

export const getActiveDays = () => (dispatch) => {
    return axios
        .get('/getActiveDays')
        .then((response) => {
            dispatch({ 
                type: SET_ACTIVE_DAYS,
                payload: response.data
            });
            dispatch({ type: CLEAR_ERRORS });
            return response.data;
        })
        .catch((err) => {
            console.log('sad');
            console.log(err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            });
        });
}

export const getTodaysActivities = (date) => (dispatch) => {
    return axios
        .get(`/getTodaysActivities/${date}`)
        .then((response) => {
            // console.log('todays activities response data: ', response.data);
            dispatch({
                type: SET_TODAYS_ACTIVITIES,
                payload: response.data
            });
            dispatch({ type: CLEAR_ERRORS });
            return response.data;
        })
        .catch((err) => {
            console.log('sad');
            console.log(err.response);
            dispatch({
                type: SET_ERRORS,
                payload: err.response
            });
        });
}

export const addUserActivity = (activity) => (dispatch) => {
    console.log('adding activity: ');
    console.log(activity);
    const dateStr = activity.date;
    axios
    .post('/addActivity', activity)
    .then((res) => {
        dispatch(getTodaysActivities(dateStr));
        dispatch(getActiveDays());
        dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
        console.log("sad");
        console.log(err);
        dispatch({
            type: SET_ERRORS,
            payload: err
        });
    });
};

export const createPost = (postContent, history) => (dispatch) => {
    console.log("here");
    console.log(postContent);
    dispatch({ type: LOADING_UI });
    axios
        .post('/post', postContent)
        .then((res) => {
            console.log("are we maybe here");


            dispatch({ type: CLEAR_ERRORS });
            console.log("push push push");
            history.push('/');

        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};


export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
        .get('/user')
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data
            });
        })
        .catch((err) => console.log(err));
};

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
        .post('/login', userData)
        .then((res) => {
            console.log("eppepepepepepee");
            console.log(res);
            console.log(res.config.data);
            console.log(res.data.token);
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: SET_AUTHENTICATED });
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    console.log("signup");
    console.log(newUserData);
    axios
        .post('/signup', newUserData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);
            dispatch(getUserData());
            console.log("here maybe?");
            dispatch({ type: CLEAR_ERRORS });
            dispatch({ type: SET_AUTHENTICATED });
            history.push('/');
        })
        .catch((err) => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
};