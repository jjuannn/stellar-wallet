import {
  Flex,
  Heading,
  UnorderedList,
  ListItem,
  InputGroup,
  Input,
  Button,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { useState } from "react";
import checkBalance from "service/checkBalance";

export default function CheckBalances() {
  const [keyToCheck, setKeyToCheck] = useState("");
  const [balances, setBalances] = useState({ loading: false, balances: null });
  const toast = useToast();

  const handleKeyChange = (e) => {
    setKeyToCheck(e.target.value);
  };

  const checkKey = async () => {
    setBalances({ ...balances, loading: true });
    try {
      if (keyToCheck.length !== 56) {
        throw new Error("Key length must be 56 characters long");
      }
      const results = await checkBalance(keyToCheck);
      setBalances({ ...balances, balances: results, loading: false });
    } catch (err) {
      setBalances({ ...balances, loading: false });
      toast({
        title: "Operation failed",
        description: err.message,
        status: "error",
        duration: 2000,
        position: "bottom-start",
      });
    }
  };

  return (
    <Flex
      justifyContent={"center"}
      alignItems={"center"}
      marginTop={"25"}
      direction={"column"}
    >
      <Heading>Balances for your account</Heading>
      <InputGroup>
        <Input type="text" value={keyToCheck} onChange={handleKeyChange} />
        <Button onClick={checkKey}>Check balances</Button>
      </InputGroup>
      <UnorderedList marginTop={"5"}>
        {balances.balances?.map(({ balance, asset_type }, i) => {
          return (
            <ListItem key={i}>
              {balance} - {asset_type}
            </ListItem>
          );
        })}
        {balances.loading && <Spinner />}
      </UnorderedList>
    </Flex>
  );
}
