import { Tab as TabComponent } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';

const Tab = ({className}) => {
    const [current, setCurrent] = React.useState('buns');
    return (
        <div className={className}>
            <TabComponent value="buns" active={current === 'buns'} onClick={setCurrent}>
                Булки
            </TabComponent>
            <TabComponent value="sauces" active={current === 'sauces'} onClick={setCurrent}>
                Соусы
            </TabComponent>
            <TabComponent value="fillings" active={current === 'fillings'} onClick={setCurrent}>
                Начинки
            </TabComponent>
        </div>
    )
}

export default Tab;


