import styles from './IngredientDetails.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const IngredientDetails = ({ selectedIngredient }) => {
    console.log('IngredientDetails ingredient:', selectedIngredient);
    const detailsInfo = {
        'Калории, ккал': selectedIngredient.calories,
        'Белки, г': selectedIngredient.proteins,
        'Жиры, г': selectedIngredient.fat,
        'Углеводы, г': selectedIngredient.carbohydrates
    }

    return (
        <div className={styles.ingredient_details}>
            <img src={selectedIngredient.image_large} alt='{ingredient.name}' className={styles.ingredient_image} />
            <p className='text text_type_main-medium mt-4 mb-8'>{selectedIngredient.name}</p>
            <div className={classNames(styles.ingredient_info, 'text text_type_main')}>
                {Object.entries(detailsInfo).map(([key, value]) => (
                    <p key={key}>
                        <span className='text text_type_main-small text_color_inactive'>{key}</span>
                        <span className='text text_type_digits-default text_color_inactive'>{value}</span>
                    </p>
                ))}
            </div>
        </div>
    )
}

IngredientDetails.propTypes = {
    ingredient: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image_large: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        proteins: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        carbohydrates: PropTypes.number.isRequired
    }).isRequired
};

export default IngredientDetails;
