import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import RestaurantsAdmin from './paginas/Admin/Restaurantes/AdminRestaurants';
import FormsRestaurant from './paginas/Admin/Restaurantes/FormsRestaurant';
import BasePage from './paginas/Admin/BasePage';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin' element={<BasePage/>}>
        <Route path="restaurantes" element={<RestaurantsAdmin />} />
        <Route path="restaurantes/novo" element={<FormsRestaurant />} />
        <Route path="restaurantes/:id" element={<FormsRestaurant />} />

      </Route>
    </Routes>
  );
}

export default App;
