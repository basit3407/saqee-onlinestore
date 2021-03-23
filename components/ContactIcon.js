import { Avatar, makeStyles } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import CallIcon from "@material-ui/icons/Call";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: 0,
    right: 0,
    position: "fixed",
    margin: theme.spacing(1),
  },
  size: {
    [theme.breakpoints.up("md")]: {
      width: theme.spacing(7),
      height: theme.spacing(7),
      fontSize: "2.1875rem",
    },
  },
  whatsApp: {
    margin: theme.spacing(1, 0),
    "&.MuiAvatar-colorDefault": {
      backgroundColor: "#4FCE5D",
    },
  },
  call: {
    "&.MuiAvatar-colorDefault": {
      backgroundColor: "#61ce70",
    },
  },
  contact: {
    "&:focus": {
      outline: "none",
    },
    "&.MuiAvatar-colorDefault": {
      backgroundColor: theme.palette.secondary.main,
    },
    cursor: "pointer",
    border: "none",
    transform: "rotate(0deg)",
    transition: "transform 1s",
    MozTransition: "transform 1s",
    WebkitTransition: "transform 1s",
    msTransition: "transform 1s",
  },
  rotate: {
    transform: "rotate(180deg)",
  },
}));

export default function ContactIcon() {
  const classes = useStyles();

  const [isClicked, setIsClicked] = useState(false); //Click state of contact icon

  return (
    <div className={classes.root}>
      {/* on click show whatsapp and call icons */}
      {isClicked && (
        <>
          <Avatar
            href="tel:+923352126988"
            component="a"
            classes={{
              root: `${classes.size} ${classes.call}`,
            }}
          >
            <CallIcon fontSize="inherit" />
          </Avatar>
          <Avatar
            href="https://wa.me/923352126988"
            component="a"
            classes={{
              root: `${classes.size} ${classes.whatsApp}`,
            }}
          >
            <WhatsAppIcon fontSize="inherit" />
          </Avatar>
        </>
      )}
      <Avatar
        classes={{
          root: `${classes.size} ${classes.contact} ${
            isClicked ? classes.rotate : "" //rotate on click
          }`,
        }}
        onClick={() => setIsClicked(!isClicked)}
        component="button"
      >
        {/* if clicked show cross icon else show chat icon */}
        {isClicked ? (
          <CloseIcon fontSize="inherit" />
        ) : (
          <ChatBubbleOutlineIcon fontSize="inherit" />
        )}
      </Avatar>
    </div>
  );
}
