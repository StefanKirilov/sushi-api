import styles from './home.module.css';

import { Link } from 'react-router-dom';

export default function Home() {

    return (
                <div className={styles.wrap}>
                    <section className={styles.section}>

                    <h2>ЯПОНСКА КУХНЯ И ДОСТАВКИ ЗА ВКЪЩИ</h2>
                    <h1 className={styles.name}>KoShiYam</h1>

                    <p>В делничните дни от 10:30ч. до 22:00ч.</p>
                    <p>Събота и неделя от 11:00ч. до 22:00ч.</p>

                    <p className={styles.tel}>Тел: +359 890 115 515</p>

                    <Link to="/menu" className={styles.menu}>МЕНЮ</Link>

                    </section>
                </div>
            );
        };