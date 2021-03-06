import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../styles/theme";

export default function MyApp(props) {
  const { Component, pageProps } = props;

  const [cartItems, setCartItems] = useState();

  //this prop will be passed to all the pages
  const passedProps = {
    ...pageProps,
    cartItems,
    setCartItems,
  };

  //on App load do the following:
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    //get cart items from  localstorage if exist,else set to empty array;
    const savedCartItems = localStorage.getItem("cartItems"),
      cartItems = JSON.parse(savedCartItems) || [];
    setCartItems(cartItems);
  }, []);

  return (
    <>
      <Head>
        <title>Saqee&apos;s Online Store</title>
        <link rel="icon" href="favicon.ico" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...passedProps} />
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
