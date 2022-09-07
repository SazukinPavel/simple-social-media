import React from "react";
import styles from "./LoadingButton.module.scss";
import { Button } from "../index";
import { ButtonProps } from "../Button/Button";

interface LoadingButtonProps extends ButtonProps {
  isLoading: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  children,
  styleType = "blue",
  ...props
}) => {
  return (
    <Button styleType={styleType} {...props}>
      <div
        className={[isLoading ? styles.Centre : "", styles.LoadingButton].join(
          " "
        )}
      >
        {isLoading && (
          <div className={[styles.Loading, styles[styleType]].join(" ")}></div>
        )}
        <span className={isLoading ? styles.Hide : ""}>{children}</span>
      </div>
    </Button>
  );
};

export default LoadingButton;
