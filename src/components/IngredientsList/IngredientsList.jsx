import IngredientItem from '../IngredientItem';
import styles from './IngredientsList.module.css';
import PropTypes from 'prop-types';

const IngredientsList = ({ data, ingredientTypes, onItemClick }) => {
    const getCategory = (type) => {
        return ingredientTypes[type];
    }

    const handleItemClick = (ingredient) => {
        onItemClick(ingredient);
    }

    return (
        <div className={styles.ingredients_categories}>
            {Object.keys(ingredientTypes).map((type) => (
                <div key={type} className="mb-10">
                    <h2 className="text text_type_main-medium mb-6">
                        {getCategory(type)}
                    </h2>
                    <div className={styles.ingredients_list}>
                        {data.filter(item => item.type === type).map(item => {
                            return (
                                <IngredientItem key={item._id} item={item} onClick={() => handleItemClick(item)} />
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
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.oneOf(['bun', 'sauce', 'main']).isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired,
            calories: PropTypes.number.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
        })
    ).isRequired,
    ingredientTypes: PropTypes.objectOf(PropTypes.string).isRequired,
    onItemClick: PropTypes.func.isRequired
};

export default IngredientsList
