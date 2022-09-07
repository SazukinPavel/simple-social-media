import axios from "axios";
import { store } from "../store";

const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  withCredentials: true,
});

$axios.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token && config.headers) {
    config.headers["authorization"] = token;
  }
  return config;
});

/*
$axios.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    console.log('start')
    console.log(error.response.status == 403 && error.config && !originalRequest._isRetry)
    if (error.response.status == 403 && error.config && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await AuthService.tryAuthorize()
            console.log(response)
            store.dispatch({type:'auth/login',payload:response.data})
            return $axios.request(originalRequest);
        } catch (e) {}
    }
})
 */

export default $axios;
