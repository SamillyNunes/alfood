import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import RestaurantsAdmin from './paginas/Admin/Restaurantes/AdminRestaurants';
import FormsRestaurant from './paginas/Admin/Restaurantes/FormsRestaurant';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<RestaurantsAdmin />} />
      <Route path="/admin/restaurantes/novo" element={<FormsRestaurant />} />
      <Route path="/admin/restaurantes/:id" element={<FormsRestaurant />} />
    </Routes>
  );
}

export default App;
