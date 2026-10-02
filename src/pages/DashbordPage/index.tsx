import StatsCard from "../../components/StatsCard/index.js";
import { useAuth } from "../../hooks/useAuth.js";
import styles from "./dashbord.module.scss";
import { FaRegFolderOpen } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { RiProgress1Line } from "react-icons/ri";
import { MdOutlineDone } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks.js";
import { useCallback, useMemo } from "react";
import type { Task } from "../../types/index.js";

interface StatsType {
    done:Task[];
    inProgress:Task[];
}

const DashbordPage = () => {
    const projects = useAppSelector(s => s.projects.items);
    const tasks = useAppSelector(s => s.tasks.items);
    console.log("tasks",tasks);

    // const stats = useMemo(()=> {
    //     const inProgress = tasks?.filter(t => t.status === "in-progress") || [];
    //     const done = tasks?.filter(t => t.status === "done") || [];
    //     const projectsCount = projects.length || 0;
    //     const tasksCount = tasks.length || 0;
    //     return {inProgress,done,projectsCount,tasksCount};
    // },[projects,tasks])

    const { user } = useAuth();
    console.log("user is:",user);

    return <div className={styles.dashboardContainer}>
            <div>
                <h3>Welcome back, {user?.name}</h3>
                <p>Here's what happening today</p>
            </div>
            <div className={styles.statsCardContainer}>
                <StatsCard count={0} title="Projects" icon={<FaRegFolderOpen/>}/>
                <StatsCard count={0} title="Tasks" icon={<BiTask/>}/>
                <StatsCard count={0} title="In-Progress" icon={<RiProgress1Line/>}/>
                <StatsCard count={0} title="Done" icon={<MdOutlineDone/>}/>

            </div>
            <div className={styles.tasksColumns}>
                <div className={styles.tasksColumn}>
                    <div className={styles.title}>
                        <IoWarningOutline />
                        <h5>Upcoming Tasks</h5>
                    </div>
                    <div>
                        <ul className={styles.list}>
                            <li><p>Task A — due in 2</p></li>
                            <li><p>Task B — due tomorrow</p></li>
                            <li><p>Task C — due in 3h</p></li>
                            <p><Link to="">View all...</Link></p>
                        </ul>
                    </div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.tasksColumn}>
                    <div className={styles.title}>
                        <BiTask/>
                        <h5>Upcoming Tasks</h5>
                    </div>
                    <div>
                        <ul className={styles.list}>
                            <li><p>Task A — due in 2</p></li>
                            <li><p>Task B — due tomorrow</p></li>
                            <li><p>Task C — due in 3h</p></li>
                            <p><Link to="">View all...</Link></p>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.recentProjects}>

            </div>
        </div>
};

export default DashbordPage;