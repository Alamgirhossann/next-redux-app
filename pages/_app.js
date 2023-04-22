import Footer from "@/components/Footer";
import Navabar from "@/components/Navabar";
import { store } from "@/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navabar />
      <Component {...pageProps} />
      <Footer/>
    </Provider>
  );
}
