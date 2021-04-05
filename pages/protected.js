import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/client";
import AccessDenied from "../components/access-denied";

export default function Page() {
  const [session, loading] = useSession();
  const [content, setContent] = useState();

  // Fetch content from protected route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/examples/protected");
      const json = await res.json();
      if (json.content) {
        setContent(json.content);
      }
    };
    fetchData();
    session && console.log(session.user);
  }, [session]);

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If no session exists, display access denied message
  if (!session) {
    return <AccessDenied />;
  }

  // If session exists, display content
  return (
    <>
      <h1>Protected Page</h1>
      <p>
        <strong>{content || "\u00a0"}</strong>
      </p>
      <button onClick={signOut}>sign out</button>
    </>
  );
}
