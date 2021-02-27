import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Cookie from "js-cookie";
import theme from "../styles/theme";
import NavBar from "../components/layout/NavBar/NavBar";
import Footer from "../components/layout/Footer";

export default function MyApp(props) {
  const { Component, pageProps } = props,
    //get cart items from cookie
    savedCartItems = Cookie.getJSON().cartItems.cartItems,
    //if no cookie saved,set to empty array
    [cartItems, setCartItems] = useState(savedCartItems ? savedCartItems : []),
    //this prop will be passed to all the pages
    passedProps = {
      ...pageProps,
      cartItems: cartItems,
      setCartItems: setCartItems,
    };

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Component {...passedProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
