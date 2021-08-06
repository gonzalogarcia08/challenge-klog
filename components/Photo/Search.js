/* eslint-disable @next/next/no-img-element */
import { createApi } from "unsplash-js";
import { useState } from "react";
import Photo from "./Photo";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const api = createApi({
  accessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
});

const Search = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const handleOnChange = ({ target: { value } }) => {
    setSearch(value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      api.search
        .getPhotos({ query: search, per_page: 4, orientation: "landscape" })
        .then((res) => {
          if (res.response.total > 0) {
            setError("");
            setData(res);
          } else {
            const message = "No se encontraron resultados para su búsqueda.";
            setError(message);
            setData(null);
          }
        })
        .catch((e) => console.error("error: ", e));
    }
    setData(null);
  };

  return (
    <Container style={{ display: data ? "flex" : "grid" }}>
      <Header>
        <SearchContainer>
          <Form onSubmit={handleSearch}>
            Búsqueda de imágenes
            <SearchInput
              onChange={(e) => handleOnChange(e)}
              value={search}
              placeholder="Comience la búsqueda..."
            />
            <SearchButton onClick={handleSearch}>Buscar</SearchButton>
          </Form>
        </SearchContainer>
      </Header>

      {data?.response.total > 0 && (
        <Header>
          <TitleResponse>Respuesta de búsqueda</TitleResponse>
          <PhotoContainer>
            {data.response.results.map(({ id, urls: { small } }, index) => (
              <Photo key={id} index={index + 1} id={id} link={small} />
            ))}
          </PhotoContainer>
        </Header>
      )}

      {error && (
        <Header>
          <ErrorMessage>{error}</ErrorMessage>
        </Header>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  place-items: center;
  height: 100vh;
`;

const ErrorMessage = styled.p`
  display: grid;
  align-items: center;
  color: #e65100;
  font-size: 25px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  place-items: center;
  width: inherit;
`;

const Header = styled.div`
  border-radius: 10px;
  display: grid;
  padding: 25px;
  place-items: center;
  width: 60vh;
`;

const PhotoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  margin: 10px;
`;

const SearchButton = styled(Button)`
  width: 30%;
  &&& {
    background: #1e88e5;
    border-top: 1px solid #1e88e5;
    border-bottom: 1px solid #1e88e5;
    color: white;
  }
  :hover {
    opacity: 0.8;
  }
`;

const SearchContainer = styled.div`
  place-items: center;
  border-radius: 2px;
  display: grid;
  margin-bottom: 10px;
  padding: 5px;
  width: 100%;
`;

const SearchInput = styled.input`
  border: none;
  background-color: #e0e0e0;
  border-radius: 6px;
  margin: 10px 0px;
  outline-width: 0;
  padding: 15px;
  width: 70%;
`;

const TitleResponse = styled.p`
  font-size: 20px;
  font-weight: bold;
`;
