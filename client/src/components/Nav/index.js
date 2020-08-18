// import React, { useState } from "react";
// import Auth from "../../utils/auth";
// import { Link } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Calender from "../Calender";
// import SearchedOfferings from "../../pages/SearchedOfferings"
// import Cart from '../Cart';



// function Nav() {

//   const AppContext = React.createContext({});

//   const [searchedSubjects, setSearchedSubjects] = useState({
//     visible: false
//   });

//   const [searchInput, setSearchInput] = useState('');


//   const handleFormSubmit = async (event) => {
//     event.preventDefault();

  

//     // if(searchedSubjects.visible == false) {
//     //   setSearchedSubjects({
//     //     visible: true
//     //   })
//     // }
      
//     // try {
//     //   // await allOfferings({
//     //   //   // variables: { id: user._id }
//     //   // })
//     //   await allOfferings
//     //   console.log(offerings, 'help')
//     //   const setSearchedSubjects = (searchedSubjects + 1);
//     // } catch (e) {
//     //   console.error(e);
//     // }
//   };

//   function showNavigation() {
    
//     if (Auth.loggedIn()) {
//       return (
//         <ul className="flex-row">


//           <li className="mx-1">
//             <Link to="/orderHistory">
//               Booked Lessons
//             </Link>
//           </li>

//           <li className="mx-1">
//             <Link to="/manageofferings">
//               Manage Offerings
//             </Link>
//           </li>

//           <li className="mx-1">
//             <Link to="/profile">
//               My Profile
//             </Link>
//           </li>

//           <li className="mx-1">
//             <Link to="/myschedule">
//               My Schedule
//             </Link>
//           </li>

//           <li className="mx-1">
//             {/* this is not using the Link component to logout or user and then refresh the application to the start */}
//             <a href="/" onClick={() => Auth.logout()}>
//               Logout
//             </a>
//           </li>

//         </ul>
//       );
//     } else {
//       return (
//           <div className="my-2 text-center">

// <button className="btn text-light my-2 my-sm-0" type="submit">Find A Tutor</button>
// <button className="btn text-light my-2 my-sm-0" type="submit">About Us</button>
        
//           <Link to="/login">
//           <button className="btn text-light my-2 my-sm-0" type="submit">Login</button>
//           </Link>
//         <Link to="/signup">
//         <button className="btn btn-secondary my-2 my-sm-0" type="submit">Join For Free</button>
//         </Link>
//         </div>
//       );
//     }
//   }

//   return (
//     <header className="flex-row px-1">
//       <h1>
//         <Link to="/">
//           {/* <span role="img" aria-label="shopping bag">🛍</span> */}
//           Connect Me
//         </Link>
//       </h1>
//         {/* <form className="form-inline ml-3" onSubmit={handleFormSubmit}> */}
//         <form className="form-inline ml-3">
//       {/* <form className="form-inline my-lg-0 position-absolute fixed-top mt-10 pl-5" onSubmit={async (event) => {
//         event.preventDefault();
//         await allOfferings;
//         console.log("hit")
//         setSearchedSubjects(searchedSubjects == 1);
//         console.log(setSearchedSubjects)
//       }}> */}

// {/* onChange={(e) => setSearchInput(e.target.value)} */}
//       <input className="form-control mr-sm-2 w-75" type="search" placeholder="Search For An Offering" aria-label="Search" onChange={(e) => setSearchInput(e.target.value)} />
//       <Link to={{
//         pathname: '/SearchedOfferings',
//         userInput:{
//           input: searchInput
//         }
//       }}>

//       <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
//       </Link>
//        </form>
//       <nav className="">
//         {showNavigation()}
//         <Cart />
//       </nav>
      
//     </header>
//   );
// }

// export default Nav;



import React, { useState } from "react";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PageviewIcon from '@material-ui/icons/Pageview';
import HomeIcon from '@material-ui/icons/Home'
import AssignmentIcon from '@material-ui/icons/Assignment';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';

import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Calender from "../Calender";
import SearchedOfferings from "../../pages/SearchedOfferings"
import Cart from '../Cart';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: "transparent"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Nav(){
  const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [searchInput, setSearchInput] = useState('');
  
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
    const handleDrawerClose = () => {
      setOpen(false);
    };

  function ShowNav() {
    
  
    if(Auth.loggedIn()){

      return(
        
        
    
        <List>
          <Avatar className="mx-5" style={{align: "center"}} alt="Remy Sharp" src="http://www.abbieterpening.com/wp-content/uploads/2013/04/circle-profile-pic-175px.png" />
          <ListItem button key="Home">
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText>
                  <Link to ="/">Home</Link>
                </ListItemText>
          </ListItem>

          <ListItem button key="Manage Offerings">
            <ListItemIcon><AssignmentIcon /></ListItemIcon>
            <ListItemText>
                  <Link to ="/manageOfferings">Manage Offerings</Link>
                </ListItemText>
          </ListItem>

          <ListItem button key="My Profile">
            <ListItemIcon><PageviewIcon /></ListItemIcon>
            <ListItemText>
                  <Link to ="/profile">My Profile</Link>
                </ListItemText>
          </ListItem>

          <ListItem button key="My Schedule">
            <ListItemIcon><MailIcon/></ListItemIcon>
            <ListItemText>
                  <Link to ="/myschedule">My Schedule</Link>
                </ListItemText>
          </ListItem>

          <ListItem >
            <ListItemIcon><MailIcon/></ListItemIcon>
            <ListItemText>
            <Link to ="/signup"onclick={() => Auth.logout()}>Logout</Link>
            {/* <a href="/signup" onclick={() => Auth.logout()}>Logout</a> */}
            </ListItemText>
          </ListItem>

          <Divider/>
        </List>
      );
    } else {
        return (
          <List>  
          <ListItem button key="Signup">
            <ListItemIcon> <MailIcon/></ListItemIcon>
            <ListItemText>
              <Link to ="/signup">Signup</Link>
            </ListItemText>
          </ListItem>
  
          <ListItem button key="Login">
            <ListItemIcon> <MailIcon/></ListItemIcon>
            <ListItemText>
              <Link to ="/login">Login</Link>
            </ListItemText>
          </ListItem>
        </List>
        );
      }
  }
  
    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              <Link to="/">Connect Me </Link>
            </Typography>
          </Toolbar>
          <input className="form-control mr-sm-2 w-25" type="search" placeholder="Search For An Offering" aria-label="Search" onChange={(e) => setSearchInput(e.target.value)} />
       <Link to={{
        pathname: '/SearchedOfferings',
        userInput:{
          input: searchInput
        }
      }}>

      <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
      </Link>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {ShowNav()}
          <Cart/>
          </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >  
          <div className={classes.drawerHeader} />
        </main>
      </div>
      )
}


