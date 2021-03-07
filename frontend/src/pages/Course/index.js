import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';

import TutorialService from '../../services';
import AlertDialog from './AlertDialog';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: "100%",
    },
    grid: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: "center",
        margin: "30px 0",
    },
    form: {
        margin: "5rem 5rem 5rem 5rem",
    },
});

const PostCourse = () => {
    const classes = useStyles();
    const initialTutorialState = {
        id: null,
        title: "",
        description: "",
        published: false
    };
    const [tutorial, setTutorial] = useState(initialTutorialState);
    const [open, setOpen] = useState(false);
    const [selectValue, setSelectValue] = useState(false);

    /** Seta os valores title e description da constante tutorial */
    const handleInputChange = event => {
        const { name, value } = event.target;
        setTutorial({ ...tutorial, [name]: value });
    };

    /** Seta o valor no checkbox */
    const handlePublished = (e) => {
        setTutorial({ ...tutorial, published: e.target.checked })
    }

    /** Método para salvar */
    const saveTutorial = () => {
        var data = {
            title: tutorial.title,
            description: tutorial.description,
            published: tutorial.published
        };

        TutorialService.create(data)
            .then(response => {
                setTutorial({
                    id: response.data.id,
                    title: response.data.title,
                    description: response.data.description,
                    published: response.data.published
                })
                newTutorial()
            })
            .catch(e => {
                console.log(e);
            });
        newTutorial();
    };

    /** Método para limpar os dados da contante tutorial */
    const newTutorial = () => {
        setTutorial(initialTutorialState);
    };

    const handleClickOpen = () => {
        saveTutorial();
        setOpen(true);
    }

    const handleClose = (value) => {
        setOpen(false);
        setSelectValue(value)
    }

    return (

        <Box component="containter" className={classes.root}>
            <Grid md className={classes.grid}>
                <form className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Nome Curso"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        value={tutorial.title}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="desciption"
                        label="Descrição"
                        name="description"
                        autoComplete="description"
                        value={tutorial.description}
                        onChange={handleInputChange}
                        multiline
                    />
                    <FormControlLabel
                        value={tutorial.published}
                        name="published"
                        id="published"
                        control={<Checkbox color="primary" />}
                        label="Publicado"
                        labelPlacement="end"
                        onChange={handlePublished}
                    />
                    <Grid style={{display: "flex"}}>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            Salvar
                        </Button>
                        <AlertDialog open={open} selectValue={selectValue} onClose={handleClose}/>
                        <Button variant="outlined" color="secondary" href={"/"} style={{marginLeft: 5}}>
                            Cancelar
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Box>
    )
}

export default PostCourse
