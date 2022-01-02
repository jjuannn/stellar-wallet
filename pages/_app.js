import { ChakraProvider } from "@chakra-ui/react";
import Head from "/components/Head";
import AppLayout from "/components/Layout";
import AccountContextProvider from "/context/account";
import { customTheme } from "/styles/global";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <AccountContextProvider>
        <Head />
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </AccountContextProvider>
    </ChakraProvider>
  );
}

export default MyApp;
