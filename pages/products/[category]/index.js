import { useRouter } from "next/router";
import {
  Grid,
  Container,
  Typography,
  makeStyles,
  Button,
  Link,
} from "@material-ui/core";
import PropTypes from "prop-types";
import Image from "next/image";
import FadeIn from "../../../components/FadeIn";
import axios from "axios";
import ErrorPage from "next/error";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  heading: {
    margin: "5% 0",
  },
  toolbar: {
    boxShadow: "1px 1px #dbdada,-1px -1px #dbdada",
    marginBottom: "5%",
  },
  gridButton: {
    textAlign: "right",
    [theme.breakpoints.only("xs")]: {
      textAlign: "center",
    },
  },
  button: {
    borderLeft: "1px solid #dbdada",
    borderRadius: 0,
    width: "100%",
    padding: "10% 0",
    backgroundColor: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
    },
  },
  array: {
    textAlign: "center",
  },
  img: {
    margin: "5% 0",
    cursor: "pointer",
  },
  item: {
    cursor: "",
  },
}));

export default function Products(props) {
  const { error, array } = props,
    classes = useStyles(),
    router = useRouter(),
    { category } = router.query,
    //convert 1st letter of query to upperCase and remaining to lowercase for heading.
    Category = category[0].toUpperCase() + category.slice(1).toLowerCase();

  if (error) {
    return <ErrorPage statusCode={error} />;
  }
  return (
    <section className={classes.section}>
      <Grid container>
        <FadeIn timeout={1000}>
          <Grid item xs={12}>
            <Container>
              <Typography
                classes={{ root: classes.heading }}
                align="center"
                variant="h3"
              >
                {Category}
              </Typography>
            </Container>
            <div className={classes.toolbar}>
              <Grid container>
                <Grid xs={false} sm={10} item></Grid>
                <Grid classes={{ root: classes.gridButton }} item xs={6} sm>
                  <Button classes={{ root: classes.button }}>
                    <Typography align="center" variant="button">
                      sort
                    </Typography>
                  </Button>
                </Grid>
                <Grid item classes={{ root: classes.gridButton }} xs={6} sm>
                  <Button classes={{ root: classes.button }}>
                    <Typography align="center" variant="button">
                      filter
                    </Typography>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </FadeIn>
      </Grid>
      <Container>
        <Grid container>
          <MapArray array={array} />
        </Grid>
      </Container>
    </section>
  );
}

Products.propTypes = {
  error: PropTypes.number,
  array: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      countInStock: PropTypes.string.isRequired,
      description: PropTypes.string,
      brand: PropTypes.string,
      auxillaryImages: PropTypes.arrayOf(PropTypes.string),
      variations: PropTypes.arrayOf(
        PropTypes.shape({
          variationTitle: PropTypes.string,
          variations: PropTypes.arrayOf(PropTypes.string),
        })
      ),
    })
  ),
};

const MapArray = (props) => {
  const { array } = props,
    // eslint-disable-next-line no-unused-vars
    [isAdmin, setIsAdmin] = useState(false),
    classes = useStyles(),
    router = useRouter();

  return array.map((item, index) => {
    return (
      <FadeIn key={index} timeout={2000}>
        <Grid classes={{ root: classes.array }} item xs={12} sm={6} md={3}>
          <Image
            className={classes.img}
            src={item.image}
            alt=""
            width={250}
            height={250}
            onClick={() => router.push("/")}
          />
          <Link
            display="block"
            href={`/`}
            underline="none"
            color="textPrimary"
            variant="body1"
          >
            {item.title}
          </Link>
          <Typography variant="body1">
            {/* place thousand separator coma */}
            Rs.{item.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </Typography>
          {/* if admin show count in stock */}
          {isAdmin && (
            <Typography display="block" variant="caption">
              count in stock:{item.countInStock}
            </Typography>
          )}
        </Grid>
      </FadeIn>
    );
  });
};

export async function getServerSideProps(context) {
  const { category } = context.params;
  try {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${category}`
    );
    return {
      props: {
        array: data.products,
      },
    };
  } catch (e) {
    return {
      props: {
        error: e.response.status,
      },
    };
  }
}
