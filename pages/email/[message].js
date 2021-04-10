import { Box, Button, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useStyles } from ".";

export default function EmailVerified() {
  const classes = useStyles();
  const router = useRouter();
  const { message, status } = router.query;

  return (
    <Box p={50} display="flex" flexDirection="column">
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
