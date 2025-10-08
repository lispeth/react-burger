import { Button, CurrencyIcon, DragIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './BurgerConstructor.module.css';
import { useState } from 'react';
import Modal from '../Modal';
import OrderDetails from '../OrderDetails';


const BurgerConstructor = ({ data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOrderButtonClick = () => {
        setIsModalOpen(true);
    }

    const handleCloseOrderModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    // захаркодим id выбранной булки
    const selectedBunId = "643d69a5c3f7b9001cfa093c";

    // захаркодим id выбранных ингредиентов
    const ingredientsId = [
        "643d69a5c3f7b9001cfa0941",
        "643d69a5c3f7b9001cfa093e",
        "643d69a5c3f7b9001cfa0942",
        "643d69a5c3f7b9001cfa0943",
        "643d69a5c3f7b9001cfa093f",
        "643d69a5c3f7b9001cfa0946",
        "643d69a5c3f7b9001cfa094a",
        "643d69a5c3f7b9001cfa0947",
        "643d69a5c3f7b9001cfa0944",
    ];

    const selectedIngredientsArr = [];
    ingredientsId.forEach(id => {
        const ingredient = data.find(item => item._id === id);
        if (ingredient) {
            selectedIngredientsArr.push(ingredient);
        }
    });

    // формируем временный объект с выбранными ингредиентами
    const constructorData = {
        selectedBun: data.find((item) => item._id === selectedBunId),
        selectedIngredients: selectedIngredientsArr
    }


    return (
        <section className={classNames(styles.burger_constructor, 'pt-25 mr-4')}>
            <p className={classNames(styles.ingredient_wrapper)}>
                <span className={classNames(styles.drag_icon, { [styles.hidden]: true })}>
                    <DragIcon type="primary" />
                </span>
                {constructorData.selectedBun && <ConstructorElement
                    type="top"
                    text={`${constructorData.selectedBun.name} (верх)`}
                    price={constructorData.selectedBun.price}
                    isLocked={true}
                    thumbnail={constructorData.selectedBun.image}
                />}
            </p>
            <div className={styles.scroll_section}>
                {constructorData.selectedIngredients.map(item => (
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
                {constructorData.selectedBun && <ConstructorElement
                    type="bottom"
                    text={`${constructorData.selectedBun.name} (низ)`}
                    price={constructorData.selectedBun.price}
                    isLocked={true}
                    thumbnail={constructorData.selectedBun.image}
                />}
            </p>
            <p className={classNames(styles.total_price, 'mt-10')}>
                <span className="text text_type_digits-medium">610</span>
                <span className={classNames(styles.currency, 'mr-10')}>
                    <CurrencyIcon type="primary" />
                </span>
                <Button htmlType="button" type="primary" size="large" onClick={handleOrderButtonClick}>
                    Оформить заказ
                </Button>
            </p>
            {isModalOpen && <Modal onClose={handleCloseOrderModal}>
                <OrderDetails />
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

