import { useRouter } from "next/router";

export default function EmailVerified() {
  const router = useRouter();
  const { message } = router.query;

  return <div>{message}</div>;
}
