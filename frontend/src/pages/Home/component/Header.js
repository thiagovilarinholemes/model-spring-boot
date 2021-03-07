import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: "100%",
    },
    grid: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        margin: "30px 0"
    },
    card: {
        margin: "5rem 2rem 0 2rem",
        minHeight: '190px',
        maxWidth: '240px',
        minWidth: '240px'
    },
    code: {
        fontSize: 13
    },
    title: {
        fontWeight: 'bold',
        // color: '#e91e63'
    },
    description: {
        marginTop: 5
    },
    published: {
        fontSize: 14,
        marginTop: 10
    },
});


const Header = ({ tutorials }) => {
    const classes = useStyles();
    return (
        <Box  className={classes.root}>
            <Grid container  className={classes.grid}>
                    {tutorials.map((tutorial) => (
                        <Card className={classes.card} key={tutorial.id}>
                            <CardContent>
                                <Typography className={classes.code} color="textSecondary" gutterBottom>
                                    Código: {tutorial.id}
                                </Typography>

                                <Typography variant="h5" component="h2" className={classes.title}>
                                    {tutorial.title}
                                </Typography>

                                <Typography variant="body2" component="p" className={classes.description}>
                                    {tutorial.description}
                                </Typography>

                                <Typography className={classes.published} color="textSecondary" gutterBottom>
                                    {tutorial.published ? "Publicado" : "Não publicado"}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
            </Grid>
        </Box>
    )
}

export default Header
