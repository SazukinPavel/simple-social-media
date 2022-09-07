import Header from "../Header";
import { NextPage } from "next";
import React from "react";
import Footer from "../Footer";
import styles from "./MyLayout.module.scss";
import { useAuthorize } from "../../../hooks";
interface MyLayoutProps {
  children: React.ReactNode;
}

const MyLayout: NextPage<MyLayoutProps> = ({ children }) => {
  useAuthorize();

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.Main}>{children}</main>
      <Footer />
    </div>
  );
};

export default MyLayout;
