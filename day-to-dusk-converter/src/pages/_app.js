import "@/styles/globals.css";
import { useEffect } from "react";
import { createDoc } from "../../firebaseConfig";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    createDoc();
  }, []);
  return <Component {...pageProps} />;
}
