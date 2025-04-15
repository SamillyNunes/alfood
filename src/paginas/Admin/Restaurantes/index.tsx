import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";

const RestaurantsAdmin = () => {
    const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);

    useEffect(() => {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(response => setRestaurants(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <TableContainer component={Paper} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Nome
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurants.map(r => (
                        <TableRow key={r.id}>
                            <TableCell>
                                {r.nome}
                            </TableCell>
                        </TableRow>

                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default RestaurantsAdmin;