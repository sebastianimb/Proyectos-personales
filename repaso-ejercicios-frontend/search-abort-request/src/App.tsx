import Search from "./components/Search";
import "./App.css";

function App() {
  return (
    <>
      <h1 className="text-3xl text-teal-200">Buscador de Pokemons</h1>
      <p className="text-xl">Utilización de abort en peticiones HTTP</p>
      <Search />
    </>
  );
}

export default App;
