import { Tab as TabComponent } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './Tab.module.css';

const Tab = ({ types, activeTab }) => {
    const [current, setCurrent] = React.useState('bun');
    return (
        <div className={styles.ingredients_tabs}>
            {Object.keys(types).map((type) => (
                <TabComponent key={type} value={type} active={activeTab === type} onClick={setCurrent}>
                    {types[type]}
                </TabComponent>
            ))}

        </div>
    )
}

export default Tab;


