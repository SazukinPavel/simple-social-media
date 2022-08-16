import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import MyLayout from "../components/layouts/MyLayout";
import {Provider} from 'react-redux';
import store from "../store";
import {useEffect} from "react";
import AuthService from "../services/AuthService";
import {useTypedDispatch} from "../hooks";
import {login} from "../store/slices/authSlice";

function MyApp({ Component, pageProps }: AppProps) {

  const dispatch=useTypedDispatch()

  useEffect(()=>{
    async function tryAuth(){
      const res=await AuthService.tryAuthorize()
      dispatch(login(res.data))
    }
    tryAuth()

  },[])

  return <Provider store={store}>
    <MyLayout>
      <Component></Component>
    </MyLayout>
  </Provider>
}

export default MyApp
