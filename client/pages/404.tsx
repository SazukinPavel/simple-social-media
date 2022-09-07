import { Link } from "../components/ui";
import Title from "../components/seo/Title";
import styles from "../styles/404.module.scss";

const Page404 = () => {
  return (
    <>
      <Title>Not found((</Title>
      <div className={["center-container", styles.Error].join(" ")}>
        <h1>
          Ohhh. Sory this page not found
          <br />
          <Link href={"/"}>Go to home</Link>
        </h1>
      </div>
    </>
  );
};

export default Page404;
