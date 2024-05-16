import styles from './sushi.module.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as apiService from '../../services/apiService';

export default function Sushi() {
    const [sushi, setSushi] = useState([]);

    useEffect(() => {
        apiService.getAllSushi()
            .then(data => setSushi(data))
            .catch(error => console.log(error));
    }, [])
    return (
        <div className={styles.top}>
            <h1 className={styles['category-name']}>СУШИ</h1>
            <div className={styles['container-top']}>
                {sushi.map(data => (
                    <div key={data._id} className={styles['container-second']}>
                        <Link to={`/menu/sushi/${data._id}`}>
                        <div className={styles["container-img"]}>
                            <img className={styles.image} src={data.image} />
                        </div>
                        <div className={styles["container-items"]}>
                            <h1 className={styles.name}>{data.name}</h1>
                            <div className={styles.line}></div>
                            <p className={styles.price}>{data.price} лв.</p>
                            <div className={styles.detail}> ДЕТАЙЛИ </div>
                            <p className={styles.count}>{data.count} бр.</p>
                            <p className={styles.weight}>/ {data.weight} гр.</p>
                        </div>
                        </Link>
                    </div>
                ))}
            </div >
        </div >
    );
}