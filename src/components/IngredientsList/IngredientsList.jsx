import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addSelectedIngredient } from '../../services/ingredientInfoSlice';
import IngredientItem from '../IngredientItem';
import styles from './IngredientsList.module.css';
import { useMemo } from 'react';
import { IngredientType } from '../../utils/types';

const IngredientsList = ({ data, ingredientTypes, onItemClick, onScroll }) => {
    const dispatch = useDispatch();
    const allIngredients = useSelector((store) => store.burgerConstructor);

    const countsIngredients = useMemo((() => {
        const { bun, ingredients } = allIngredients;
        const counts = {};
        ingredients.forEach(ingredient => {
            if (!counts[ingredient._id]) counts[ingredient._id] = 0;
            counts[ingredient._id]++;
        });
        if (bun) counts[bun._id] = 2;
        return counts;

    }), [allIngredients])

    const getCategory = (type) => {
        return ingredientTypes[type];
    }

    const handleItemClick = (ingredient) => {
        onItemClick(ingredient);
        dispatch(addSelectedIngredient(ingredient));
    }

    return (
        <div className={styles.ingredients_categories} onScroll={onScroll}>
            {Object.keys(ingredientTypes).map((type) => (
                <div key={type} className="mb-10">
                    <h2 className="text text_type_main-medium mb-6" id={type} >
                        {getCategory(type)}
                    </h2>
                    <div className={styles.ingredients_list}>
                        {data.filter(item => item.type === type).map(item => {
                            return (
                                <IngredientItem key={item._id} item={item} count={countsIngredients[item._id]} onClick={() => handleItemClick(item)} />
                            )
                        })
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}

IngredientsList.propTypes = {
    data: PropTypes.arrayOf(IngredientType).isRequired,
    ingredientTypes: PropTypes.objectOf(PropTypes.string).isRequired,
    onItemClick: PropTypes.func.isRequired,
    onScroll: PropTypes.func.isRequired
};

export default IngredientsList
