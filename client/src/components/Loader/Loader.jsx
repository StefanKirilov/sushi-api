import styles from './loader.module.css';


export function Loader() {

    return (
        <div className={styles["sushi-machine"]}>
            <div className={styles["neta"]}></div>
            <div className={styles["rice"]}></div>
            <div className={styles["sushi"]}></div>
            <div className={styles["table"]}></div>
        </div>
    );
};