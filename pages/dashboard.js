import { Box, Flex, Text } from "@chakra-ui/react";
import AccountBalances from "components/AccountBalances";
import CheckBalance from "components/CheckBalances";
import Title from "components/Title";
import Transaction from "components/Transaction";
import { accountContext } from "context/account";
import router from "next/router";
import { useEffect } from "react";
import { useContext } from "react";

export default function Dashboard() {
  const { accountState, dispatch } = useContext(accountContext);

  useEffect(() => {
    if (!accountState.userKeypair) {
      router.push("/");
    }
  });

  return (
    <>
      <Flex
        justifyContent={"center"}
        marginTop={"5"}
        alignItems={"center"}
        direction="column"
      >
        <Title title={"Dashboard"} subtitle={"You have all the control now."} />
      </Flex>
      <Text textAlign={"center"} marginTop={"5"}>
        Logged as {accountState.userKeypair?.publicKey()}
      </Text>
      <AccountBalances accountState={accountState} dispatch={dispatch} />
      <Transaction accountState={accountState} dispatch={dispatch} />
      <CheckBalance />
    </>
  );
}
