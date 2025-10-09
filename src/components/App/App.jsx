import React from "react";
import getIngredients from "../../api/getIngredients";
import AppHeader from "../AppHeader";
import BurgerConstructor from "../BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients";
import styles from "./App.module.css";

function App() {
  const [allIngredients, setAllIngredients] = React.useState([]);

  React.useEffect(() => {
    getIngredients().then((result) => {
      setAllIngredients(result.data);
    })
      .catch((error) => {
        console.error("Error fetching ingredients:", error);
      });
  }, []);


  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.main_container}>
        <BurgerIngredients data={allIngredients} />
        <BurgerConstructor data={allIngredients} />
      </main>
    </div>
  );
}

export default App;
