import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const RestaurantsAdmin = () => {
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);

  useEffect(() => {
    axios
      .get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
      .then((response) => setRestaurants(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteRestaurant = (id: number) => {
    axios
      .delete(`http://localhost:8000/api/v2/restaurantes/${id}/`)
      .then(() => {
        const newRestaurantsList = restaurants.filter((r) => r.id !== id);
        setRestaurants(newRestaurantsList);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurants.map((r) => (
            <TableRow key={r.id}>
              <TableCell>{r.nome}</TableCell>
              <TableCell>
                [ <Link to={`/admin/restaurantes/${r.id}`}>editar</Link> ]
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => deleteRestaurant(r.id)}
                  variant="outlined"
                  color="error"
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RestaurantsAdmin;
