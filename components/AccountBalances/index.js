import checkBalance from "service/checkBalance";
import { useEffect, useState } from "react";
import {
  Flex,
  useToast,
  Heading,
  UnorderedList,
  ListItem,
  Spinner,
} from "@chakra-ui/react";

export default function AccountBalances({ accountState, dispatch }) {
  const [balancesState, setBalancesState] = useState({
    loading: false,
    balances: accountState.balances,
  });
  const toast = useToast();

  useEffect(async () => {
    setBalancesState((state) => ({ ...state, loading: true }));
    try {
      const balances = await checkBalance(accountState.userKeypair.publicKey());
      dispatch({ type: "UPDATE_ACCOUNT_BALANCES", payload: balances });
      setBalancesState((state) => ({ ...state, loading: false }));
    } catch (err) {
      toast({
        title: "An error has occurred",
        description: err.message,
        status: "error",
        duration: 1500,
        position: "bottom-start",
      });
      setBalancesState((state) => ({ ...state, loading: false }));
    }
  }, []);

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      marginTop={"25"}
      direction={"column"}
    >
      <Heading>Balances for your account</Heading>
      <UnorderedList marginTop={"5"}>
        {accountState.accountBalances?.map(({ balance, asset_type }, i) => {
          return (
            <ListItem key={i}>
              {balance} - {asset_type}
            </ListItem>
          );
        })}
        {balancesState.loading && <Spinner />}
      </UnorderedList>
    </Flex>
  );
}
