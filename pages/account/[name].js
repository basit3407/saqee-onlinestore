import { Button, Container } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import Layout from "../../components/layout";
import Top from "../../components/layout/Top";
// import { useState } from "react";
import { useStyles } from "../email/";

export default function Account(props) {
  const classes = useStyles();
  const router = useRouter();
  const { cartItems } = props;

  const handleClick = () =>
    axios.get("/api/logout").then(() => router.push("/"));
  return (
    <Layout cartItems={cartItems}>
      <Top heading="Account" />
      <Container>
        <Button onClick={handleClick} classes={{ root: classes.button }}>
          Logout
        </Button>
      </Container>
    </Layout>
  );
}

Account.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      variations: PropTypes.objectOf(PropTypes.string),
      qty: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      price: PropTypes.number,
    })
  ),
};
