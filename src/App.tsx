import styles from "./App.module.css";
import AppHeader from "./components/appheader";
import BurgerConstructor from "./components/burger-constructor";
import BurgerIngredients from "./components/burger-ingredients";
import data from "./utils/data.json";

function App() {
  // захаркодим id выбранной булки
  const selectedBunId = "60666c42cc7b410027a1a9b1";
  const selectedBun = data.find((item) => item._id === selectedBunId);
  // захаркодим id выбранных ингредиентов
  const selectedIngredientsIds = [
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
  ];
  const selectedIngredients = data.filter((item) =>
    selectedIngredientsIds.includes(item._id)
  );
  return (
    <div className="App">
      <AppHeader />
      <main className={styles.main_container}>
        <BurgerIngredients data={data}/>
        <BurgerConstructor
          selectedBun={selectedBun}
          data={selectedIngredients}
        />
      </main>
    </div>
  );
}

export default App;
