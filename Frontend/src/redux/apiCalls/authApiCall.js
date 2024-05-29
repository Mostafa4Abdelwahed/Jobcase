import { authActions } from "../slices/authSlice";
import request from "../../utils/request"
import { toast } from "react-hot-toast";

// Profile User
export function ProfileUser(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.get(`/auth/profile/${user.id}`,{
                headers:{
                    Authorization: user.token
                }
            });
            dispatch(authActions.profile(data.data));
            // console.log(data.data.found_email);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Login User
export function loginUser(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("/auth/login", user)

            dispatch(authActions.login(data))
            localStorage.setItem('userInfo', JSON.stringify(data))
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Logout User
export function logoutUser() {
    return (dispatch) => {
        dispatch(authActions.logout());
        localStorage.removeItem('userInfo')
    }
}

// Register User
export function registerUser(user) {
    return async (dispatch) => {
        try {
            const { data } = await request.post("/auth/register", {
                name: user.name,
                email: user.email,
                password: user.password,
            });
            dispatch(authActions.register(data.message));
            toast.success("Registerd Successfully");
            toast.success("Go To Login");
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

// Update User
export function updateUser(user, newUser) {
    return async (dispatch) => {
        try {
            const { data } = await request.put(`/auth/profile/${user.id}`, newUser,{
                headers:{
                    Authorization: user.token
                }
            });
            toast.success(data.messgae);
            console.log(data);
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}