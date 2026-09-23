import styles from "./errorPage.module.scss";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  isRouteErrorResponse(error);
  console.log(error);

  return <div className={styles.errorPgaeContainer}>
    {isRouteErrorResponse(error) && error.data}
  </div>;
};

export default ErrorPage;
