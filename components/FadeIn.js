import { Fade, useScrollTrigger } from "@material-ui/core";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

export default function FadeIn(props) {
  const { children, timeout } = props,
    trigger = useScrollTrigger(),
    [animate, setAnimate] = useState(false);

  useEffect(() => {
    trigger && !animate && setAnimate(true);
  }, [animate, trigger]);

  return (
    <Fade in={animate} timeout={timeout}>
      {children}
    </Fade>
  );
}

FadeIn.propTypes = {
  children: PropTypes.element.isRequired,
  timeout: PropTypes.number.isRequired,
};
