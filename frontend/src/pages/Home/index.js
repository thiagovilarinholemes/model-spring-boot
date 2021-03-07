import React, { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'; 
import { makeStyles } from '@material-ui/core/styles';

import TutorialService from '../../services';
import Navbar from './component/Navbar';
import Header from './component/Header';
import PostCourse from '../Course/';
import NotFound from '../NotFound'

const useStyles = makeStyles({
    main: {
        height: 'calc(100vh - 64px)',
        padding: 24
    },
});


function Home() {
    const classes = useStyles();
    const [tutorials, setTutorials] = useState([]);

    // com Promises, uma das formas de receber dados
    useEffect(() => {
        TutorialService
            .getAll()
            .then((response) => {
                setTutorials(response.data);
            })
            .catch((error) => {
                alert("Ocorreu um erro ao buscar os items: " + error);
            });
    }, []);

    return (
        <>
        <main className={classes.main}>
            <Navbar />
                <Routes>
                    <Route exact path="/" element={ <Header tutorials={tutorials}/> } />
                    <Route exact path="/course/insert" element={ <PostCourse/> } />
                    <Route path="*" element={<NotFound/>} />
                </Routes>
            </main>
        </>
    )
}

export default Home


// Promise é um objeto usado para processamento assíncrono. Um Promise (de "promessa") representa um 
// valor que pode estar disponível agora, no futuro ou nunca.

// O async/await é uma nova forma de tratar Promises dentro do nosso código, 
// evitando a criação de cascatas de .then

// Link: https://blog.rocketseat.com.br/quando-utililzar-promises-e-async-await-no-useeffect-do-react/