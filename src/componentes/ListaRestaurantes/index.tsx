import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import { IPaginacao } from "../../interfaces/IPaginacao";
import { Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import http from "../../http";

const base_url = "v1/restaurantes/";

const ListaRestaurantes = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);
  const [nextPage, setNextPage] = useState("");
  const [previousPage, setPreviousPage] = useState("");
  const [searchingRestaurant, setSearchingRestaurant] = useState("");
  const [sorting, setSorting] = useState("");

  const loadData = (url: string, params?: Object) => {
    http
      .get<IPaginacao<IRestaurante>>(url, {
        params: params,
      })
      .then((response) => {
        setRestaurants(response.data.results);
        setNextPage(response.data.next);
        setPreviousPage(response.data.previous);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    loadData(base_url);
  }, []);

  const onSubmitSearchingForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loadData(base_url, {
      search: searchingRestaurant,
      ordering: sorting,
    });
  };

  return (
    <section className={style.ListaRestaurantes}>
      <div className={style.titleSearch}>
        <h1>
          Os restaurantes mais <em>bacanas</em>!
        </h1>
        <form onSubmit={onSubmitSearchingForm} className={style.inputs}>
          <InputLabel id="demo-simple-select-label">Ordenação:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sorting}
            label="Ordenação"
            onChange={v => setSorting(v.target.value)}
          >
            <MenuItem value="">Padrão</MenuItem>
            <MenuItem value="id">ID</MenuItem>
            <MenuItem value="nome">Nome</MenuItem>
          </Select>
          <TextField
            value={searchingRestaurant}
            onChange={(e) => setSearchingRestaurant(e.target.value)}
            label="Buscar restaurante"
            variant="outlined"
          />
          <Button variant="contained" type="submit" >
            Buscar
          </Button>
        </form>
      </div>
      {restaurants.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      <button onClick={() => loadData(previousPage)} disabled={!previousPage}>
        Página anterior
      </button>
      <button onClick={() => loadData(nextPage)} disabled={!nextPage}>
        {" "}
        Próxima página
      </button>
    </section>
  );
};

export default ListaRestaurantes;
