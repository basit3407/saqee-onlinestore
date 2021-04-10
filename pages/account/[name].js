import { Button } from "@material-ui/core";
import axios from "axios";
import { useRouter } from "next/router";
// import { useState } from "react";
import { useStyles } from "../email";

export default function Account() {
  const classes = useStyles();
  const router = useRouter();

  const handleClick = () =>
    axios.get("/api/logout").then(() => router.push("/"));
  return (
    <div>
      <Button onClick={handleClick} classes={{ root: classes.button }}>
        Logout
      </Button>
    </div>
  );
}
