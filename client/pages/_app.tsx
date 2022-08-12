import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import MyLayout from "../components/UI/MyLayout";
import Head from "next/head";
import {Provider} from 'react-redux';
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return <Provider store={store}>
    <Head>
      <title></title>
    </Head>
    <MyLayout>
      <Component></Component>
    </MyLayout>
  </Provider>
}

export default MyApp
