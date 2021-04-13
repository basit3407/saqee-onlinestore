import { Button, Container, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import { useStyles } from "./index";

export default function EmailVerified() {
  const classes = useStyles();
  const router = useRouter();
  const { message, status } = router.query;

  return (
    <Container maxWidth="sm">
      <div className={classes.root}>
        <Typography> {message}</Typography>
        <div>
          {status !== "done" ? (
            <Button classes={{ root: classes.button }}>Resend</Button>
          ) : (
            <Button classes={{ root: classes.button }} href="/">
              Go to Home Page
            </Button>
          )}
        </div>
      </div>
    </Container>
  );
}
