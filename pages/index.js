import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import Title from "/components/Title";
import StellarSDK from "stellar-sdk";
import activateAccount from "/service/activateAccount";
import { accountContext } from "/context/account";
import router from "next/router";
import serverInstance from "/service/_index";

export default function Home() {
  const { dispatch, accountState } = useContext(accountContext);
  const toast = useToast();
  const [keyToImport, setKeyToImport] = useState("");

  const handleKeyToImport = (event) => {
    setKeyToImport(event.target.value);
  };

  const importKey = async () => {
    dispatch({ type: "SET_ACCOUNT_LOADING" });
    try {
      if (keyToImport.length != 56) {
        throw new Error("The key must be 56 characters length");
      }
      const keypair = StellarSDK.Keypair.fromSecret(keyToImport);
      await serverInstance.loadAccount(keypair.publicKey());
      dispatch({ type: "SET_ACCOUNT", payload: keypair });
      router.push("/dashboard");
    } catch (err) {
      toast({
        title: "An error has occurred",
        description: "Check your key length or if its is correct",
        status: "error",
        duration: 1500,
        position: "bottom-start",
      });
      dispatch({ type: "ACCOUNT_RESET_STATE" });
    }
  };

  const generateKeys = async () => {
    dispatch({ type: "SET_ACCOUNT_LOADING" });
    try {
      const keypair = StellarSDK.Keypair.random();
      await activateAccount(keypair.publicKey());
      dispatch({ type: "SET_ACCOUNT", payload: keypair });
      router.push("/account-created");
    } catch (err) {
      toast({
        title: "An error has occurred",
        description: err.message,
        status: "error",
        duration: 1500,
        position: "bottom-start",
      });
      dispatch({ type: "ACCOUNT_RESET_STATE" });
    }
  };

  return (
    <>
      <Flex
        justifyContent={"center"}
        marginTop={"5"}
        alignItems={"center"}
        direction="column"
      >
        <Title
          title={"Wallet App"}
          subtitle={"Start operating in the Stellar Network!"}
        />
      </Flex>
      <Flex direction={"column"} alignItems={"center"} marginTop={"10"}>
        <Box textAlign={"center"} marginBottom={"10"}>
          <Text marginBottom={"2"}>You don't have an account?</Text>
          <Button
            colorScheme={"green"}
            onClick={generateKeys}
            disabled={accountState.loading}
          >
            Generate keys
          </Button>
        </Box>
        <Box textAlign={"center"}>
          <Text marginBottom={"2"}>
            If you have an account, import it below
          </Text>
          <InputGroup>
            <Input
              textTransform={"uppercase"}
              value={keyToImport}
              onChange={handleKeyToImport}
              placeholder="Secret key"
            />
            <Button
              marginLeft={"1"}
              disabled={accountState.loading}
              onClick={importKey}
              colorScheme={"green"}
            >
              Import
            </Button>
          </InputGroup>
        </Box>
      </Flex>
    </>
  );
}
