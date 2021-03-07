import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Toolbar from '@material-ui/core/Toolbar';
import { Menu, Home, AssignmentInd } from '@material-ui/icons';
import MobilRightMenuSlider from "@material-ui/core/Drawer"; /** Effect Drawer to Menu */

import avatar from '../../../img/avatar.jpg';

/** Styles */
const useStyles = makeStyles(theme => ({
  appbar: {
    background: "purple"
  },
  menu: {
    marginLeft: "15px",
    marginRight: "15px"
  },
  menuSliderContainer: {
    width: 250,
    background: "#fff",
    height: "100%"
  },
  avatar: {
    display: "block",
    margin: "0.5rem auto",
    width: theme.spacing(13),
    height: theme.spacing(13)
  },
  listItem: {
    color: "tan"
  }
}));

/** Menu */
const menuItens = [
  {
    listIcon: <Home />,
    listText: "Home",
    listPath: "/"
  },
  {
    listIcon: <AssignmentInd />,
    listText: "Cadastrar curso",
    listPath: "/course/insert"
  }
];


const Navbar = () => {
  const classes = useStyles({
    right: false
  });
  const [state, setState] = useState({
    right: false
  });
  const toogleSlider = (slider, open) => () => {
    setState({ ...state, [slider]: open })
  }
  const sideList = slider => (
    <Box
      className={classes.menuSliderContainer}
      component="div"
      onClick={toogleSlider(slider, false)}
    >
      <Avatar className={classes.avatar} src={avatar} alt="Thiago" />
      <Divider />
      <List>
        {menuItens.map((lsItem, key) => (

          <ListItem button key={key} component={Link} to={lsItem.listPath}>
            <ListItemIcon className={classes.listItem}>
              {lsItem.listIcon}
            </ListItemIcon>

            <ListItemText>
              {lsItem.listText}
            </ListItemText>
          </ListItem>

        ))}
      </List>
    </Box>
  );


  return (
    <>
      <Box component="nav">
        <AppBar position="fixed" className={classes.appbar}>
          <Toolbar>

            <IconButton onClick={toogleSlider("right", true)} display="block">
              <div className={classes.menu}>
                <Menu style={{ color: "tomato" }} />
                <Typography style={{ color: "tomato", fontSize: "70%" }}>Menu</Typography>
              </div>
            </IconButton>

            <Box paddingLeft="15px">
              <Typography variant="h4" style={{ color: "tan" }}>
                Cursos
                        </Typography>

              {/* Abertura do Menu */}
              <MobilRightMenuSlider
                anchor="left" /** Define onde o Menu irá abrir */
                open={state.right}
                onClose={toogleSlider("right", false)}
              >
                {sideList("right")}
              </MobilRightMenuSlider>

            </Box>

          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Navbar;
