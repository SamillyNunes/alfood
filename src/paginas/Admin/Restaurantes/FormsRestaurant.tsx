import { Box, Button, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import http from "../../../http";

const FormsRestaurant = () => {
  const params = useParams();

  const [name, setName] = useState("");

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (params.id) {
      http
        .put(`v2/restaurantes/${params.id}/`, {
          nome: name,
        })
        .then((response) => alert("Restaurante atualizado com sucesso!"));
    } else {
        http
        .post("v2/restaurantes/", {
          nome: name,
        })
        .then((response) => alert("Restaurante cadastrado com sucesso!"));
    }
  };

  useEffect(() => {
    if (params.id) {
        http
        .get<IRestaurante>(
          `v2/restaurantes/${params.id}/`
        )
        .then((response) => setName(response.data.nome));
    }
  }, [params.id]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" onSubmit={onSubmitForm}>
        <TextField
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Nome do Restaurante"
          variant="standard"
          fullWidth
          required
        />
        <Button type="submit" variant="outlined" fullWidth sx={{marginTop:1}}>
          Enviar
        </Button>
      </Box>
    </Box>
  );
};

export default FormsRestaurant;
