import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import RestaurantsAdmin from './paginas/Admin/Restaurantes/AdminRestaurants';
import FormsRestaurant from './paginas/Admin/Restaurantes/FormsRestaurant';
import BasePage from './paginas/Admin/BasePage';
import AdminDishes from './paginas/Admin/Pratos/AdminDishes';
import FormsDishes from './paginas/Admin/Pratos/FormsDishes';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path='/admin' element={<BasePage/>}>
        <Route path="restaurantes" element={<RestaurantsAdmin />} />
        <Route path="restaurantes/novo" element={<FormsRestaurant />} />
        <Route path="restaurantes/:id" element={<FormsRestaurant />} />

        <Route path="pratos" element={<AdminDishes />} />
        <Route path="pratos/novo" element={<FormsDishes />} />
        <Route path="pratos/:id" element={<FormsDishes />} />

      </Route>
    </Routes>
  );
}

export default App;
