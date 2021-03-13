import { Avatar, makeStyles } from "@material-ui/core";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import CallIcon from "@material-ui/icons/Call";
import CloseIcon from "@material-ui/icons/Close";
import { useState } from "react";
import classNames from "classnames";

const useStyles = makeStyles((theme) => ({
  root: {
    bottom: 0,
    right: 0,
    position: "fixed",
    margin: theme.spacing(1),
  },
  size: {
    width: theme.spacing(7),
    height: theme.spacing(7),
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
    transition: "transform 1s",
    MozTransition: "transform 1s",
    WebkitTransition: "transform 1s",
    msTransition: "transform 1s",
  },
  rotate: {
    transform: "rotate(180deg)",
  },
  rotateBack: {
    transform: "rotate(0deg)",
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
}));

export default function ContactIcon() {
  const classes = useStyles();

  const [isClicked, setIsClicked] = useState(); //Click state of contact icon

  //For rotating animation of contact icon
  const contactClasses = classNames({
    [classes.size]: true,
    [classes.contact]: true,
    [classes.rotate]: isClicked === true,
    [classes.rotateBack]: isClicked === false,
  });

  return (
    <div className={classes.root}>
      {/* on click show whatsapp and call icons */}
      {isClicked && (
        <>
          <Avatar
            href="tel:+923002631368"
            component="a"
            classes={{
              root: classNames({ [classes.call]: true, [classes.size]: true }),
            }}
          >
            <CallIcon fontSize="large" />
          </Avatar>
          <Avatar
            href="https://wa.me/923002631368"
            component="a"
            classes={{
              root: classNames({
                [classes.whatsApp]: true,
                [classes.size]: true,
              }),
            }}
          >
            <WhatsAppIcon fontSize="large" />
          </Avatar>
        </>
      )}
      <Avatar
        classes={{ root: contactClasses }}
        onClick={() => setIsClicked(!isClicked)}
        component="button"
      >
        {/* if clikced show cross icon else show chat icon */}
        {isClicked ? (
          <CloseIcon fontSize="large" />
        ) : (
          <ChatBubbleOutlineIcon fontSize="large" />
        )}
      </Avatar>
    </div>
  );
}
