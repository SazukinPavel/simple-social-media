import "../styles/globals.scss";
import type { AppProps } from "next/app";
import MyLayout from "../components/layouts/MyLayout";
import { store, wrapper } from "../store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <MyLayout>
        <Component {...pageProps}></Component>
      </MyLayout>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
