/* eslint-disable jsx-a11y/anchor-is-valid */
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './appheader.module.css';
import classnames from 'classnames';


const AppHeader = () => {
    return (
        <header className={classnames(styles.app_header, "pl-4 pr-4 pb-4 pt-4 mt-4")}>
            <nav className={styles.navleft}>
                <a href='#' className={classnames(styles.navlink)}>
                    <span><BurgerIcon type="primary" className={"pr-1"} /></span>
                    <span className={classnames(styles.text_color_active)}>Конструктор</span>
                </a>
                <a href='#' className={classnames(styles.navlink)}>
                    <span className={styles.navicon}><ListIcon type="secondary" className={"pr-1"} /></span>
                    <span className='text text_type_main-default text_color_inactive'>Лента заказов</span>
                </a>
            </nav>
            <main className={styles.mainlogo}>
                <Logo />
            </main>
            <span className={styles.navright}>
                <a href='#' className={styles.navlink}>
                    <span className={styles.navicon}><ProfileIcon type="secondary" className={"pr-1"} /></span>
                    <span className='text text_type_main-default text_color_inactive'>Личный кабинет</span>
                </a>
            </span>
        </header>
    )
}


export default AppHeader;
