import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

const FormsDishes = () => {
  const params = useParams();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [restaurants, setRestaurants] = useState<IRestaurante[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const onSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nome", name);
    formData.append("descricao", description);
    formData.append("tag", selectedTag);
    formData.append("restaurante", selectedRestaurant);

    if (image) {
      formData.append("imagem", image);
    }

    http
      .request({
        url: "v2/pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {
        setName("");
        setDescription("");
        setSelectedTag("");
        setSelectedRestaurant("");
        setImage(null);
        alert("Prato cadastrado com sucesso!");
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("v2/tags/")
      .then((response) => setTags(response.data.tags))
      .catch((error) => console.error(error));

    loadRestaurants().then((restaurantsList) => {
      if (params.id) {
        loadDish(restaurantsList ?? []);
      }
    });
  }, [params.id]);

  const loadDish = (restaurantsList: IRestaurante[]) => {
    http.get<IPrato>(`/v2/pratos/${params.id}/`).then((response) => {
      setName(response.data.nome);
      setDescription(response.data.descricao);
      setSelectedTag(response.data.tag);
      
      const sRestaurant = restaurantsList.find(
        (r) => r.id === response.data.restaurante
      );
      
      if (sRestaurant) setSelectedRestaurant(sRestaurant.id.toString());
    });
  };

  const loadRestaurants = async () => {
    try {
      const response = await http.get<IRestaurante[]>("v2/restaurantes/");
      if (response.data) {
        setRestaurants(response.data);
        return response.data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImage(event.target.files[0]);
    } else {
      setImage(null);
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Typography component="h1" variant="h6">
          Formulário de Pratos
        </Typography>
        <Box component="form" onSubmit={onSubmitForm} sx={{ width: "100%" }}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Nome do Prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            label="Descrição do Prato"
            variant="standard"
            fullWidth
            required
            margin="dense"
          />

          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-tag">Tag</InputLabel>

            <Select
              labelId="select-tag"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
            >
              {tags.map((t) => (
                <MenuItem value={t.value} key={t.id}>
                  {t.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl margin="dense" fullWidth>
            <InputLabel id="select-restaurant">Restaurante</InputLabel>

            <Select
              labelId="select-restaurant"
              value={selectedRestaurant}
              onChange={(e) => setSelectedRestaurant(e.target.value)}
            >
              {restaurants.map((r) => (
                <MenuItem value={r.id} key={r.id}>
                  {r.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <input type="file" onChange={selectFile}></input>

          <Button
            type="submit"
            variant="outlined"
            fullWidth
            sx={{ marginTop: 1 }}
          >
            Enviar
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default FormsDishes;
