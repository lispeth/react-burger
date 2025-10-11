import PropTypes from 'prop-types';
import IngredientsList from '../IngredientsList';
import Tab from '../Tab';
import styles from './BurgerIngredients.module.css';
import React from 'react';
import Modal from '../Modal';
import IngredientDetails from '../IngredientDetails';

const BurgerIngredients = ({ data }) => {
    const [detailsModalIsOpen, setDetailsModalIsOpen] = React.useState(false);
    const [selectedIngredient, setSelectedIngredient] = React.useState(null);

    const handleItemClick = (ingredient) => {
        setDetailsModalIsOpen(!detailsModalIsOpen);
        setSelectedIngredient(ingredient);
    }

    const handleCloseModal = () => {
        setDetailsModalIsOpen(false);
        setSelectedIngredient(null);
    }

    const ingredientTypes = { bun: 'Булки', sauce: 'Соусы', main: 'Начинки' };
    return (
        <section className={styles.burger_ingredients}>
            <header className='pt-10 pb-5'>
                Соберите бургер
            </header>
            <Tab className={styles.tabs} types={ingredientTypes} ></Tab>
            <IngredientsList data={data} ingredientTypes={ingredientTypes} onItemClick={handleItemClick}></IngredientsList>
            {detailsModalIsOpen && <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                <IngredientDetails ingredient={selectedIngredient} />
            </Modal>}
        </section>
    )
}

BurgerIngredients.propTypes = {
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


export default BurgerIngredients;
