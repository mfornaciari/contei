import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Home() {
  const [fetched, setFetched] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCookie() {
      await fetch("/auth");
      setFetched(true);
    }
    fetchCookie();
  }, []);

  return <main>{fetched && <Link to={"/contei"}>Contei</Link>}</main>;
}
