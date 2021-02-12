import { Fade } from "@material-ui/core";
import PropTypes from "prop-types";
import { cloneElement } from "react";
import { useInView } from "react-intersection-observer";

export default function FadeIn(props) {
  const { children, timeout } = props,
    [ref, inView] = useInView({
      triggerOnce: true,
    });

  return (
    <Fade in={inView} timeout={timeout}>
      {cloneElement(children, { ref: ref })}
    </Fade>
  );
}

FadeIn.propTypes = {
  children: PropTypes.element.isRequired,
  timeout: PropTypes.number.isRequired,
};
