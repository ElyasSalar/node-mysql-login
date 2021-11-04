import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react"

import { createStore } from "redux";
import reducer from "../redux/reducer";
import { Provider } from "react-redux";

const store = createStore(
  reducer,
  typeof window !== "undefined" &&
    process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
