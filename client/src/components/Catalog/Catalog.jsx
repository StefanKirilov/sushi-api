
import { Link, Outlet } from 'react-router-dom';
import styles from './catalog.module.css';

export default function Footer() {

    return (
        <div className={styles["top-container"]}>
            <section className={styles.menu}>
                <h1 className={styles.name}>МЕНЮ</h1>
                <div className={styles.sushi}>
                    <Link to="/menu/sushi">
                        <div className={styles.sushiInside}><h1>СУШИ</h1></div>
                    </Link>
                </div>
                <div className={styles.drinks}>
                    <Link to="/menu/drinks">
                        <div className={styles.drinksInside}><h1>НАПИТКИ</h1></div>
                    </Link>
                </div>
                <div className={styles.sauce}>
                    <Link to="/menu/sauce">
                        <div className={styles.sauceInside}><h1>ДОБАВКИ</h1></div>
                    </Link>
                </div>
            </section>
        </div>
    );
}