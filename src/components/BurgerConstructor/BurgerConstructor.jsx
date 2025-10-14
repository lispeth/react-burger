import { Button, CurrencyIcon, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import { useMemo, useState } from 'react';
import Modal from '../Modal';
import OrderDetails from '../OrderDetails';
import { useSelector, useDispatch } from 'react-redux';
import { setOrderNumber } from '../../services/orderSlice';
import { removeComponentFromConstructor } from '../../services/burgerConstructorSlice';
import { useDrop } from 'react-dnd';
import { addComponentToConstructor } from '../../services/burgerConstructorSlice';


const BurgerConstructor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const bun = useSelector((store) => store.burgerConstructor.bun);
    const ingredients = useSelector((store) => store.burgerConstructor.ingredients);
    const orderNumber = useSelector((store) => store.order.orderNumber);
    const dispatch = useDispatch();
    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch(addComponentToConstructor(item));
            console.log('Dropped item:', item);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    const borderColor = isHover ? 'lightgreen' : 'transparent';


    const handleOrderButtonClick = () => {
        dispatch(setOrderNumber(123234));
        setIsModalOpen(true);
    }

    const handleCloseOrderModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleDeleteItem = (id) => {
        console.log('ID!!!', id);
        dispatch(removeComponentFromConstructor(id));
    }

    const totalPrice = useMemo(() => {
        const bunPrice = bun ? bun.price * 2 : null;
        const ingredientsPrice = ingredients.reduce((total, item) => total + item.price, 0);
        return bunPrice + ingredientsPrice;
    }, [ingredients, bun]);


    return (
        <section
            className={classNames(styles.burger_constructor, 'pt-25 mr-4')}
            ref={dropTarget}
            style={{ borderColor, border: '1px solid transparent' }}
        >

            <p className={classNames(styles.ingredient_wrapper)}>
                <span className={classNames(styles.drag_icon, { [styles.hidden]: true })}>
                    <DragIcon type="primary" />
                </span>
                {bun && <ConstructorElement
                    key={bun._id}
                    type="top"
                    text={`${bun.name} (верх)`}
                    price={bun.price}
                    isLocked={true}
                    thumbnail={bun.image}
                />}
            </p>
            <div className={styles.scroll_section}>
                {ingredients.map(item => (
                    <p
                        key={item.uniqueId}
                        className={classNames(styles.ingredient_wrapper, 'mt-4 mr-4')}
                    >
                        <span className={classNames(styles.dragIcon, { [styles.hidden]: item.isLocked })}>
                            <DragIcon type="primary" className={styles.drag_icon} />
                        </span>
                        <ConstructorElement
                            type={item.type}
                            text={item.name}
                            price={item.price}
                            isLocked={item.isLocked}
                            thumbnail={item.image}
                            handleClose={() => handleDeleteItem(item.uniqueId)}
                        />
                    </p>
                ))}
            </div>
            <p className={classNames(styles.ingredient_wrapper)}>
                <span className={classNames(styles.drag_icon, { [styles.hidden]: true })}>
                    <DragIcon type="primary" />
                </span>
                {bun && <ConstructorElement
                    type="bottom"
                    text={`${bun.name} (низ)`}
                    price={bun.price}
                    isLocked={true}
                    thumbnail={bun.image}
                />}
            </p>
            <p className={classNames(styles.total_price, 'mt-10')}>
                <span className="text text_type_digits-medium">{totalPrice}</span>
                <span className={classNames(styles.currency, 'mr-10')}>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={handleOrderButtonClick}>
                    Оформить заказ
                </Button>
            </p>

            {isModalOpen && <Modal onClose={handleCloseOrderModal}>
                <OrderDetails orderNumber={orderNumber} />
            </Modal>}
        </section>
    )
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
        })
    ).isRequired
};


export default BurgerConstructor;

