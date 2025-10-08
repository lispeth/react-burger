import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './OrderDetails.module.css'


const OrderDetails = () => {
    return (
        <div className={styles.order_details}>
            <span className="text text_type_digits-large ">672123</span>
            <span className={"text text_type_main-medium mt-8 mb-15"}>идентификатор заказа</span>
            <span className={styles.check_mark}><CheckMarkIcon type="primary" className={styles.icon}/></span>
            <span className={"text text_type_main-small mt-15 mb-2"}>Ваш заказ начали готовить</span>
            <span className={"text text_type_main-small text_color_inactive"}>Дождитесь готовности на орбитальной станции</span>
        </div>
    )
}

export default OrderDetails;
