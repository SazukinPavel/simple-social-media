import type { NextPage } from "next";
import Title from "../components/seo/Title";
import styles from "../styles/Home.module.scss";
import Link from "../components/ui/Link";

const Home: NextPage = () => {
  return (
    <>
      <Title>Home</Title>
      <div className={[styles.Home, "center-container"].join(" ")}>
        <div>
          <h1>
            Welcome to <br />
            Simple Social Media
          </h1>
          <p>
            Please <Link href="/register">sign in</Link> or{" "}
            <Link href="/login">login</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
