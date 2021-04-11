import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useRouter } from "next/router";
import { useStyles } from ".";

export default function EmailVerified() {
  const classes = useStyles();
  const router = useRouter();
  const { message, status } = router.query;

  const theme = useTheme(),
    matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box p={matches ? 15 : 40} display="flex" flexDirection="column">
      <Typography> {message}</Typography>
      {status !== "done" ? (
        <Button classes={{ root: classes.button }}>Resend</Button>
      ) : (
        <Button classes={{ root: classes.button }} href="/">
          Go to Home Page
        </Button>
      )}
    </Box>
  );
}
