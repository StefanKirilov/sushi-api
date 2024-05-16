import styles from './sauce.module.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as apiService from '../../services/apiService';

export default function Sauce() {
    const [desert, setDesert] = useState([]);

    useEffect(() => {
        apiService.getAllSauce()
            .then(data => setDesert(data))
            .catch(error => console.log(error));
    }, [])

    return (
        <div>
            <div className={styles.top}>
                <h1 className={styles['category-name']}>Десерти</h1>
                <div className={styles['container-top']}>
                    {desert.map(data => (
                        <div key={data._id} className={styles['container-second']}>
                              <Link to={`/menu/sauce/${data._id}`}>
                            <div className={styles["container-img"]}>
                                <img className={styles.image} src={data.image} />
                            </div>
                            <div className={styles['container-items']}>
                                <h1 className={styles.name}>{data.name} </h1>
                                <div className={styles.line}></div>
                                <p className={styles.price}>{data.price} лв.</p>
                                <div className={styles.detail}>ДЕТАЙЛИ</div>
                                <p className={styles.weight}>{data.volume} гр.</p>
                            </div>
                            </Link>
                        </div>
                    ))}
                </div >
            </div >
        </div>
    );
}