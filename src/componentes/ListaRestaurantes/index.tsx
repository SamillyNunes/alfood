import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';

const ListaRestaurantes = () => {

  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);
  const [nextPage, setNextPage] = useState('');
  const [previousPage, setPreviousPage] = useState('');

  const loadData = (url: string) => {
    axios.get<IPaginacao<IRestaurante>>(url)
      .then(response => {
        setRestaurants(response.data.results);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
      })
      .catch(error => console.error(error));
  }

  useEffect(() => {
    loadData('http://localhost:8000/api/v1/restaurantes/');
  }, []);

  return (<section className={style.ListaRestaurantes}>
    <h1>Os restaurantes mais <em>bacanas</em>!</h1>
    {restaurants.map(item => <Restaurante restaurante={item} key={item.id} />)}
    <button onClick={()=>loadData(previousPage)} disabled={!previousPage} >Página anterior</button>
    <button onClick={()=>loadData(nextPage)} disabled={!nextPage}> Próxima página</button>
  </section>)
}

export default ListaRestaurantes