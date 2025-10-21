import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addComponentToConstructor, removeComponentFromConstructor, updateIngredientsPosition } from '../../services/burgerConstructorSlice';
import { decrementCount, incrementCount } from '../../services/ingredientsSlice';
import { getOrderDetails, resetOrder } from '../../services/orderSlice';
import { BurgerConstructorItem } from '../BurgerConstructorItem/BurgerConstructorItem';
import Loader from '../Loader';
import Modal from '../Modal';
import OrderDetails from '../OrderDetails';
import styles from './BurgerConstructor.module.css';


const BurgerConstructor = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const { bun, ingredients } = useSelector((store) => store.burgerConstructor);
    const { orderNumber, orderRequest } = useSelector((store) => store.order);

    const [{ isHover }, dropTarget] = useDrop({
        accept: "ingredient",
        drop(item) {
            dispatch(addComponentToConstructor(item));
            dispatch(incrementCount(item));
        },
        collect: monitor => ({
            isHover: monitor.isOver({ shallow: true }),
        })
    });

    const handleOrderButtonClick = () => {
        const ingredientsIds = [
            ...ingredients.map(item => item._id),
            bun ? bun._id : null,
        ]
        setIsModalOpen(true);
        dispatch(getOrderDetails(ingredientsIds));
    }

    const handleCloseOrderModal = () => {
        setIsModalOpen(!isModalOpen);
        dispatch(resetOrder());
    }

    const handleDeleteItem = (item) => {
        dispatch(decrementCount(item));
        dispatch(removeComponentFromConstructor(item));
    }

    const totalPrice = useMemo(() => {
        const bunPrice = bun ? bun.price * 2 : null;
        const ingredientsPrice = ingredients.reduce((total, item) => total + item.price, 0);
        return bunPrice + ingredientsPrice;
    }, [ingredients, bun]);

    const moveIngredient = useCallback((dragIndex, hoverIndex) => {
        const dragIngredient = ingredients[dragIndex];
        const newIngredients = [...ingredients];
        newIngredients.splice(dragIndex, 1);
        newIngredients.splice(hoverIndex, 0, dragIngredient);

        dispatch(
            updateIngredientsPosition(newIngredients)
        );
    }, [ingredients, dispatch]);

    const orderBtnStyle = ingredients.length === 0 ? { pointerEvents: 'none', opacity: 0.5 } : {};

    return (
        <section
            className={classNames(styles.burger_constructor, 'pt-25 mr-4',
                { [styles.hover]: isHover }
            )}
        >
            {bun && (
                <div className={styles.bun_locked}>
                    <BurgerConstructorItem
                        key={`bun._id + ${Math.random()}`}
                        item={bun}
                        text={`${bun.name} (верх)`}
                        type="top"
                    />
                </div>
            )}

            <div
                className={styles.scroll_section}
                ref={dropTarget}
            >
                {ingredients.map((item, index) => (
                    <BurgerConstructorItem
                        key={`item._id + ${Math.random()}`}
                        style={{ borderColor: isHover ? '#4C4CFF transparent' : 'transparent', borderWidth: '2px', borderStyle: 'solid' }}
                        index={index}
                        item={item}
                        moveIngredient={moveIngredient}
                        handleClose={handleDeleteItem}
                    />
                ))}
            </div>
            {bun && (<div className={styles.bun_locked}><BurgerConstructorItem
                key={`bun._id + ${Math.random()}`}
                item={bun}
                text={`${bun.name} (низ)`}
                type="bottom"
            />
            </div>)}
            <p className={classNames(styles.total_price, 'mt-10')}>
                <span className="text text_type_digits-medium">{totalPrice}</span>
                <span className={classNames(styles.currency, 'mr-10')}>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={handleOrderButtonClick} style={orderBtnStyle} >
                    Оформить заказ
                </Button>
            </p>

            {
                isModalOpen && <Modal onClose={handleCloseOrderModal}>
                    {orderRequest && <Loader />}
                    {!orderRequest && <OrderDetails orderNumber={orderNumber} />}
                </Modal>
            }
        </section >
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

