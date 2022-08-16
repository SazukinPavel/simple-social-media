import axios from "axios";
import store from "../store";
import AuthService from "../services/AuthService";

const $axios=axios.create({
    baseURL:process.env.NEXT_PUBLIC_SERVER_URL
})

$axios.interceptors.request.use((config)=>{
    const token=store.getState().auth.accessToken
    console.log(store.getState())
    if(token && config.headers){
        config.headers['authorization']=token
    }
    return config
})

$axios.interceptors.response.use((config) => {
    return config;
},async (error) => {
    const originalRequest = error.config;
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await AuthService.tryAuthorize()
            store.dispatch({type:'auth/login',payload:response.data})
            return $axios.request(originalRequest);
        } catch (e) {}
    }
    throw error;
})


export default $axios