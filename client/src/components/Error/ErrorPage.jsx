import styles from './ErrorPage.module.css';

import { Link } from 'react-router-dom';


export function ErrorPage() {

    return (
        <main className={styles["errorPage"]}>
            <div className={styles["not-found-page"]}>
                <div className={styles["not-found-page-container"]}>
                    <p>Страницата, която търсите не съществува. Отидете на <Link to="/" className={styles.btn}>начална страница</Link>.
                    </p>
                </div>
            </div>
        </main>
    )
}