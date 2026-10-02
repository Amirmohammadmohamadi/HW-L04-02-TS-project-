import type { ReactNode } from "react";
import styles from "./statsCard.module.scss";

interface PropsType {
    title:string;
    icon?:ReactNode;
    count:number;
}

const StatsCard = ({title,icon,count}:PropsType) => {
    return <div className={styles.cardContainer}>
        {icon}
        {count}
        <h4>{title}</h4>
    </div>
};

export default StatsCard;