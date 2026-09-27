import styles from "./notFoundPage.module.scss";

import BaseLayout from "../../Layout/BaseLayout/index.js"
import CustomButton from "../../components/CustomButton/index.js";
import { Link } from "react-router-dom";

const NotFoundPag = ()=> {
    return <BaseLayout>
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>404</h1>
                <h2>.Not Found</h2>
            </div>
            <div className={styles.detail}>
                <p>Unfortunately, the page you were looking for does not exist.</p>
                <Link to="/"><CustomButton title="Back to Home" variant="primary"/></Link>
            </div>
        </div>
    </BaseLayout>
};

export default NotFoundPag;