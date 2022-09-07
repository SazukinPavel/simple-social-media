import "../styles/globals.scss";
import type { AppProps } from "next/app";
import MyLayout from "../components/layouts/MyLayout";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MyLayout>
      <Component {...pageProps}></Component>
    </MyLayout>
  );
}

export default wrapper.withRedux(MyApp);
