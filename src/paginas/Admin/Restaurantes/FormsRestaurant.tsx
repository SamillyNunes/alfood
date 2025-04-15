import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const FormsRestaurant = () => {
    const [name, setName] = useState("");

    const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/v2/restaurantes/', {
            nome: name,
        }).then(response => alert('Restaurante cadastrado com sucesso!'));
    };

    return (
        <form onSubmit={onSubmitForm}>
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Nome do Restaurante"
                variant="standard"
            />
            <Button type="submit" variant="outlined">Enviar</Button>
        </form>
    );
};

export default FormsRestaurant;
