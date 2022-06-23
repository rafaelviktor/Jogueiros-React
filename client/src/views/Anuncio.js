import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

import AnuncioTitLoc from "./components/Anuncio/AnuncioTituloLocal";
import AnuncioPreco from "./components/Anuncio/AnuncioPrice";
import AnuncioAutor from "./components/Anuncio/AnuncioAutor";
import AnuncioImagens from "./components/Anuncio/AnuncioImagens";
import AnuncioDescLoc from "./components/Anuncio/AnuncioDescLoc";
import Footer from "./Footer";
import NavBar from "./Navbar";

const Anuncio = () => {
  const params = useParams();
  const id = params.id

  const [data, setData] = useState(null);

  const getAd = async () => {
    try {
      const res = await fetch(`/anuncios/anuncio/${id}`, {
        method: "GET",
      });

      const parseData = await res.json();
      setData(parseData);
    } catch (err) {
      console.error(err.message);
    }
  };
  
  useEffect(() => {
    getAd();
  },[]);

  const [open, setOpen] = useState(true);
  const handleClose = () => {
      setOpen(false);
  };

function SetLoading() {
  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

  return (
    <>
      <NavBar />
                  {
                    data && data.map((item) => (
                      <>
                        {
                          handleClose
                        }
                        <main className="d-flex flex-column align-items-center">
                          <section className="container-ad">
                          <div className="col"></div>
                          <AnuncioTitLoc titulo={item.titulo} />
                          <div id="containerAd">
                            <AnuncioImagens imgAd={item.imagem}/>
                            <aside className="anuncioAside">
                              <AnuncioPreco preco={item.preco}/>
                              <AnuncioAutor autor={item.user_name.split(' ')[0]} celular={item.celular} infoAd={data[0]}/>
                            </aside>
                          </div>
                          <div id="containerDescr" className="mt-4">
                            <AnuncioDescLoc id={item.id} views={item.visualizacao} descricao={item.descricao} cep={item.cep} logradouro={item.logradouro} bairro={item.bairro} cidade={item.cidade} />
                          </div>
                        </section>
                      </main>
                      <span className="spacing"/>
                      <Footer id="block"/>
                      </>
                      ))
                    }
                  {
                  (data == "") &&
                    <SetLoading />
                  }
    </>
  );
};

export default Anuncio;