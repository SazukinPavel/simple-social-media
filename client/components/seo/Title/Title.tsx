import Head from "next/head";
import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Head>
      <title>{children + " | Simple Social Media"}</title>
    </Head>
  );
};

export default Title;
