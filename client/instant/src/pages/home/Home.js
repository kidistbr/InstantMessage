
import "./home.css"
import Messaging from "../../components/Messaging";
import Sidebar from "../sidebar/sidebar";
import '../sidebar/sidebar.css'
import { useLocation } from "react-router";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import AccountMenu from "../AccountMenu";
import image from './../../wallpaper3.jpg'

const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));




export default function Home() {

  const { user } = useContext(AuthContext);
  const name = user.name.split(" ");
  const initials = name[0].split("")[0]+name[1].split("")[0];
  console.log("User from home", initials);

  const [anchorEl, setAnchorEl] = React.useState(null);
  // const menuOpen = Boolean(anchorEl);
  // const handleClick = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const handleClick = (event) => {
  // }
  let query = new URLSearchParams(useLocation().search);

  const theme = useTheme();
const [open, setOpen] = React.useState(true);

const handleDrawerOpen = () => {
  setOpen(true);
};

const handleDrawerClose = () => {
  setOpen(false);
};


  return (
    // <Grid container style={{width: '100%', margin: '0 auto'}}>
    //   <Grid item xs={12}>
    //     <NavBar/>
    //   </Grid>
    //   <Grid item xs={4}>
    //     <div style={{height: 100, margin: 0}}><Sidebar/></div>
    //   </Grid>
    //   <Grid item xs={8}>
    //     <div style={{height: 100}}>
    //       <Messaging userId={query.get("userId")} userName={query.get("userName")}/></div>
    //   </Grid>
    // </Grid>
    <React.Fragment>

    <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <AppBar position="fixed" style={{backgroundColor: "#1877f2"}} open={open}>
      <Toolbar sx={{ display: 'flex' }}>
        <IconButton
          // color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
          <MenuIcon  style= {{color:"#f0f2f5"}} />
        </IconButton>
        <Typography style= {{color:"#f0f2f5"}} variant="h6" noWrap component="div">
           Instant Messaging
          </Typography>
          <AccountMenu/>
        </Toolbar>
    </AppBar>
    <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
     <DrawerHeader style={{backgroundColor: "#1877f2", color:"#f0f2f5"}}>
          <IconButton style={{color:"#f0f2f5"}} onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Sidebar/>
        </Drawer>
        <Main open={open}
                  style={{
                    backgroundImage: 'url('+image+')',
                    backgroundSize: "cover",
                    height: "100vh",
                    color: "#f5f5f5"
                  }}>
        <DrawerHeader />
        {/* <Typography paragraph>
        </Typography> */}
        <Messaging userId={query.get("userId")} userName={query.get("userName")}/>
        </Main>

        </Box>

      </React.Fragment>

  );
}
