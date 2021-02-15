import { Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

export default function ProtoType(props) {
  const { heading, array } = props;
  return (
    <section>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">{heading}</Typography>
        </Grid>
        <MapArray array={array} />
      </Grid>
    </section>
  );
}

ProtoType.propTypes = {
  heading: PropTypes.string.isRequired,
  array: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ),
};

const MapArray = (props) => {
  const { array } = props;

  return array.map((item, index) => {
    return (
      <Grid key={index} item xs={12} md={3}>
        <div>
          <img src={`images/prototype/${item.img}.png`} alt="" />
          <Typography variant="body1">{item.name}</Typography>
          <Typography variant="body1">{item.price}</Typography>
        </div>
      </Grid>
    );
  });
};
