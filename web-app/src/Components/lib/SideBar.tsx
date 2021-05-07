import { Button, Typography } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { BsTrashFill } from 'react-icons/bs';
import { User, UserMeme } from '../../@types/arrayTypes';
import Addmember from '../dashboard/Addmember';

interface Props {
  open: boolean;
  setOpen: any;
  users: UserMeme[];
  thisUser: User;
  setMemeChange: any;
  memeChange: boolean;
  fam?: string;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
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
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    Button: {
      position: 'absolute',
      bottom: 0,
      width: '95%',
      marginBottom: '20px'
    }
  }),
);

const Sidebar: React.FC<Props> = ({open, setOpen, users, thisUser, fam, setMemeChange, memeChange}: Props) => {
  const [show2, setShow2] = useState(false);
  const classes = useStyles();
  const theme = useTheme();

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const del = async (user_id: string) => {
    const del = await fetch(`http://localhost:8090/api/v1/family/del/${fam}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({user_id})
    })

    setMemeChange(!memeChange)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {users.map((user) => (
            
             
              <Accordion key={user.user_id}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content"
          id="panel1a-header" >
            <ListItem >
              <ListItemText primary={user.user_name} style={user.user_id === thisUser.user_id ? {color: 'green'} : {}} />
            </ListItem>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="subtitle2" >{user.user_email}</Typography>
                {user.user_id !== thisUser.user_id ? (
                  <Button color="secondary" startIcon={<BsTrashFill />} onClick={() => del(user.user_id)}  ></Button>
                ) : null}
              </AccordionDetails>
            </Accordion>
))}
        </List>
        <Divider />
        <Button color="primary" variant="contained" onClick={() => setShow2(true)} className={classes.Button}  >
         Add member
        </Button>
        <Modal show={show2} onHide={() => setShow2(false)}>
          <Addmember user={thisUser} show={show2} setShow={setShow2} fam={fam} setMemeChange={setMemeChange} memeChange={memeChange} />
        </Modal>
      </Drawer>
    </div>
  );
}

export default Sidebar;