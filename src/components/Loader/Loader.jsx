import styles from './Loader.module.css';

const Loader = () => {
    return (
        <div className={styles.loader_container}>
            <div className={styles.spinner}>
            </div>
            <p>Оформляем Ваш заказ...</p>
        </div>
    );
};

export default Loader;
