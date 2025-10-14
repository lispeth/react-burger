import React from "react";
import getIngredients from "../../api/getIngredients";
import AppHeader from "../AppHeader";
import BurgerConstructor from "../BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients";
import styles from "./App.module.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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
    <DndProvider backend={HTML5Backend}>
      <div className={styles.app}>
        <AppHeader />
        <main className={styles.main_container}>
          <BurgerIngredients data={allIngredients} />
          <BurgerConstructor data={allIngredients} />
        </main>
      </div>
    </DndProvider>
  );
}

export default App;
