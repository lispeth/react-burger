import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import classNames from 'classnames';
import Tab from '../../components/Tab';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';

const BurgerIngredients = ({data}) => {
    const types = ['bun', 'sauce', 'main'];
    const getCategory = (type) => {
        switch (type) {
            case 'bun':
                return 'Булки';
            case 'sauce':
                return 'Соусы';
            case 'main':
                return 'Начинки';
            default:
                return '';
        }
    }

    return (
        <section className={styles.burger_ingredients}>
            <header className='pt-10 pb-5'>
                Соберите бургер
            </header>
            <Tab className={styles.tabs} types></Tab>
            <div className={styles.ingredients_categories}>
                {types.map((type) => (
                    <div key={type} className="mb-10">
                        <h2 className="text text_type_main-medium mb-6">
                            {getCategory(type)}
                        </h2>
                        <div className={styles.ingredients_list}>
                            {data.filter(item => item.type === type).map(item => {
                                return (
                                    <div key={item._id} className={styles.ingredient_card}>
                                        <img src={item.image} alt={item.name} />
                                        {item.count && <span className={classNames(styles.ingredient_count, 'text_type_digits-default')}>{item.count}</span>}
                                        <p className={classNames(styles.ingredient_price, 'mt-1 mb-1', 'text text_type_digits-default')}>
                                            <span className=' p-1'>{item.price}</span>
                                            <CurrencyIcon type="primary" /></p>
                                        <p className='text text_type_main-default'>{item.name}</p>
                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>
                ))}

            </div>
        </section>
    )
}

BurgerIngredients.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        count: PropTypes.number
    })).isRequired
};


export default BurgerIngredients;
