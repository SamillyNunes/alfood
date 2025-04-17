import { useEffect, useState } from "react";
import IPrato from "../../../interfaces/IPrato";
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
import { Link } from "react-router-dom";
import http from "../../../http";

const AdminDishes = () => {
  const [dishes, setDishes] = useState<IPrato[]>([]);

  useEffect(() => {
    http
      .get<IPrato[]>("v2/pratos/")
      .then((response) => setDishes(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteDish = (id: number) => {
    http
      .delete(`v2/pratos/${id}/`)
      .then(() => {
        const newDishesList = dishes.filter((r) => r.id !== id);
        setDishes(newDishesList);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dishes.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.nome}</TableCell>
              <TableCell>{d.tag}</TableCell>
              <TableCell>
                <a href={d.imagem} target="_blank" rel="noreferrer">[ver imagem]</a>
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/pratos/${d.id}`}>editar</Link> ]
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => deleteDish(d.id)}
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

export default AdminDishes;
