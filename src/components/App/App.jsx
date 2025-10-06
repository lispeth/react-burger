import styles from "./App.module.css";
import AppHeader from "../AppHeader";
import BurgerConstructor from "../BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients";
import React from "react";
import getIngredients from "../../api/getIngredients";

function App() {
  const [selectedBun, setSelectedBun] = React.useState(null);
  const [allIngredients, setAllIngredients] = React.useState([]);

  React.useEffect(() => {
    getIngredients().then((result) => {
      setAllIngredients(result.data);
    });
  }, []);

  // захаркодим id выбранных ингредиентов
  const ingredients = {
    selectedBun: "60666c42cc7b410027a1a9b1",
    ingredientsIds: [
      "60666c42cc7b410027a1a9b3",
      "60666c42cc7b410027a1a9b4",
      "60666c42cc7b410027a1a9b8",
      "60666c42cc7b410027a1a9bc",
      "60666c42cc7b410027a1a9bb",
      "60666c42cc7b410027a1a9bb",
      "60666c42cc7b410027a1a9ba",
      "60666c42cc7b410027a1a9b8",
      "60666c42cc7b410027a1a9bd",
      "60666c42cc7b410027a1a9b3",
    ],
  };

  const burgerConstructorData = {
    selectedBun: data.find((item) => item._id === ingredients.selectedBun),
    selectedIngredients: data.filter((item) =>
      ingredients.ingredientsIds.includes(item._id)
    ),
  };

  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main_container}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={burgerConstructorData} />
      </main>
    </div>
  );
}

export default App;
