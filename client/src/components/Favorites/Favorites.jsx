import styles from './favorites.module.css';

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import * as apiService from '../../services/apiService';
import AuthContext from '../../contexts/authContext';

export default function Sushi() {
    const [sushi, setSushi] = useState([]);
    const [myFavoriteSushi, setFavoriteSushi] = useState([]);

    useEffect(() => {
        apiService.getAllSushi()
            .then(data => setSushi(data))
            .catch(error => console.log(error));
    }, [])

    const { userId } = useContext(AuthContext);

    let favoriteSushi = sushi.filter(sushi => sushi.likes.find(like => like == userId));


    return (
        <div className={styles.top}>
            <h1 className={styles['category-name']}>ЛЮБИМИ</h1>
            <div className={styles['container-top']}>
                {favoriteSushi.map(data => (
                    <div key={data._id} className={styles['container-second']}>
                        <Link to={`/menu/sushi/${data._id}`}>
                            <div className={styles["container-img"]}>
                                <img className={styles.image} src={data.image} />
                            </div>
                            <div className={styles["container-items"]}>
                                <h1 className={styles.name}> {data.name} </h1>
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