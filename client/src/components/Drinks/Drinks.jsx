import styles from './drinks.module.css';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as apiService from '../../services/apiService';

export default function Drinks() {
    const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        apiService.getAllDrinks()
            .then(data => setDrinks(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <div className={styles.top}>
                <h1 className={styles['category-name']}>НАПИТКИ</h1>
                <div className={styles['container-top']}>
                    {drinks.map(data => (
                        <div key={data._id} className={styles['container-second']}>
                                   <Link to={`/menu/drinks/${data._id}`}>
                            <div className={styles['container-img']}>
                                <img className={styles.image} src={data.image} />
                            </div>
                            <div className={styles['container-items']}>
                                <h1 className={styles.name}>{data.name}</h1>
                                <div className={styles.line}></div>
                                <p className={styles.price}>{data.price} лв.</p>
                                <div className={styles.detail}>ДЕТАЙЛИ</div>
                                <p className={styles.weight}>{data.volume} мл.</p>
                            </div>
                            </Link>
                        </div>
                    ))}
                </div >
            </div >
        </div>
    );
}