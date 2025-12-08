import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedIngredient, removeSelectedIngredient } from '../../services/ingredientInfoSlice';
import { fetchAllIngredients } from '../../services/ingredientsSlice';
import IngredientDetails from '../IngredientDetails';
import IngredientsList from '../IngredientsList';
import Modal from '../Modal';
import Tab from '../Tab';
import styles from './BurgerIngredients.module.css';

const BurgerIngredients = () => {
    const [detailsModalIsOpen, setDetailsModalIsOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = React.useState('bun');
    const items = useSelector((store) => store.ingredients.items);
    const selectedIngredient = useSelector((store) => store.ingredientInfo.ingredient);

    const handleItemClick = (ingredient) => {
        setDetailsModalIsOpen(!detailsModalIsOpen);
        dispatch(addSelectedIngredient(ingredient));
    }

    const handleCloseModal = () => {
        dispatch(removeSelectedIngredient());
        setDetailsModalIsOpen(false);
    }

    useEffect(() => {
        dispatch(fetchAllIngredients());
    }, []);

    const handleScroll = () => {
        const bunPositionTop = document.getElementById('bun').getBoundingClientRect().top;
        const sauceSectionTop = document.getElementById('sauce').getBoundingClientRect().top;
        const mainSectionTop = document.getElementById('main').getBoundingClientRect().top;

        const offset = 250;

        if (bunPositionTop <= offset && sauceSectionTop > offset) {
            setActiveTab('bun');
        } else if (sauceSectionTop <= offset && mainSectionTop > offset) {
            setActiveTab('sauce');
        } else if (mainSectionTop <= offset) {
            setActiveTab('main');
        }
    }


    const ingredientTypes = { bun: 'Булки', sauce: 'Соусы', main: 'Начинки' };
    return (
        <section className={styles.burger_ingredients}>
            <header className='pt-10 pb-5'>
                Соберите бургер
            </header>
            <Tab className={styles.tabs} types={ingredientTypes} activeTab={activeTab} ></Tab>
            <IngredientsList data={items} onScroll={handleScroll} ingredientTypes={ingredientTypes} onItemClick={handleItemClick}></IngredientsList>
            {detailsModalIsOpen && <Modal title="Детали ингредиента" onClose={handleCloseModal}>
                <IngredientDetails selectedIngredient={selectedIngredient} />
            </Modal>}
        </section>
    )
}

export default BurgerIngredients;
