import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import { ConstructorElement, DragIcon, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerConstructor = ({ data }) => {
    const {selectedBun, selectedIngredients} = data;
    return (
        <section className={classNames(styles.burger_constructor, 'pt-25 mr-4')}>
            <p className={classNames(styles.ingredient_wrapper)}>
                <span className={classNames(styles.drag_icon, { [styles.hidden]: true })}>
                    <DragIcon type="primary" />
                </span>
                <ConstructorElement
                    type="top"
                    text={`${selectedBun.name} (верх)`}
                    price={selectedBun.price}
                    isLocked={true}
                    thumbnail={selectedBun.image}
                />
            </p>
            <div className={styles.scroll_section}>
                {selectedIngredients.map(item => (
                    <p key={item._id} className={classNames(styles.ingredient_wrapper, 'mt-4 mr-4')}>
                        <span className={classNames(styles.dragIcon, { [styles.hidden]: item.isLocked })}>
                            <DragIcon type="primary" className={styles.drag_icon} />
                        </span>
                        <ConstructorElement
                            type={item.type}
                            text={item.name}
                            price={item.price}
                            isLocked={item.isLocked}
                            thumbnail={item.image}
                        />
                    </p>
                ))}
            </div>
            <p className={classNames(styles.ingredient_wrapper)}>
                <span className={classNames(styles.drag_icon, { [styles.hidden]: true })}>
                    <DragIcon type="primary" />
                </span>
                <ConstructorElement
                    type="bottom"
                    text={`${selectedBun.name} (низ)`}
                    price={selectedBun.price}
                    isLocked={true}
                    thumbnail={selectedBun.image}
                />
            </p>
            <p className={classNames(styles.total_price, 'mt-10')}>
                <span className="text text_type_digits-medium">610</span>
                <span className={classNames(styles.currency, 'mr-10')}>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large">
                    Оформить заказ
                </Button>
            </p>
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.shape({
        selectedBun: PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            count: PropTypes.number
        }).isRequired,
        selectedIngredients: PropTypes.arrayOf(PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            count: PropTypes.number,
            isLocked: PropTypes.bool
        })).isRequired
    }).isRequired
}

export default BurgerConstructor;
