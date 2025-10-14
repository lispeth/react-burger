import styles from './IngredientItem.module.css';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

const IngredientItem = ({ item, onClick }) => {
    const [{ isDrag }, dragRef] = useDrag({
        type: 'ingredient',
        item: item,
        collect: monitor => ({
            isDrag: monitor.isDragging(),
        })
    });
    return (
        <div
            className={styles.ingredient_item}
            ref={dragRef}
            style={{ opacity: isDrag ? 0.5 : 1 }}
            onClick={onClick}>
            <img src={item.image} alt={item.name} />
            {true && <span className={classNames(styles.ingredient_count, 'text_type_digits-default')}>{10}</span>}
            <p className={classNames(styles.ingredient_price, 'mt-1 mb-1', 'text text_type_digits-default')}>
                <span className=' p-1'>{item.price}</span>
                <CurrencyIcon type="primary" /></p>
            <p className='text text_type_main-default'>{item.name}</p>
        </div>
    )
}

IngredientItem.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        count: PropTypes.number
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default IngredientItem;
