import styles from "./errorPage.module.scss";
import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import errorPic from "../../pictures/images.jfif";
import BaseLayout from "../../Layout/BaseLayout/index.js";
import CustomButton from "../../components/CustomButton/index.js";
import { TbFaceIdError } from "react-icons/tb";
import errorSVG from "../../SVGs/error.svg"

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  let title = "An error occurred.";
  let message = "Unfortunately, a problem occurred. Please try again."

  if(isRouteErrorResponse(error)) {
    title = `${error.status}-${error.statusText}`;
    message = error.data ?? message;

  } else if(error instanceof Error) {
    message = error.message;

  } else if(typeof error === "string") {
    message = error;
  }

  return <BaseLayout><div className={styles.errorPgaeContainer}>
    <div className={styles.errorContainer}>
      <div className={styles.errorText}>
        <h2>{title}</h2>
        <p>{message}</p>
        <Link to="/"><CustomButton title="back to home" variant="primary"/></Link>
      </div>
      {/* <img src={errorPic} alt="error picture" className={styles.errorImg}/> */}
      {/* <TbFaceIdError className={styles.errorImg} size={200}/> */}
      <TbFaceIdError className={styles.errorImg} size="60%"/>
    </div>
  </div></BaseLayout>
};

export default ErrorPage;
