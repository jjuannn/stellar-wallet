import {
  Box,
  Button,
  Heading,
  Input,
  Flex,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import checkBalance from "service/checkBalance";
import sendPayment from "service/sendPayment";

export default function Transaction({ accountState, dispatch }) {
  const [loading, setLoading] = useState(false);
  const [destinationAccount, setDestinationAccount] = useState("");
  const [amount, setAmount] = useState(0);
  const toast = useToast();

  const handleDestinationChange = (e) => {
    setDestinationAccount(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const paymentSubmit = async () => {
    setLoading(true);
    try {
      const results = await sendPayment(
        accountState.userKeypair,
        destinationAccount,
        amount
      );
      toast({
        title: "Transaction complete",
        description: `Transaction with ID ${results.id} completed successfully`,
        status: "success",
        duration: 2000,
        position: "bottom-start",
      });
      const balances = await checkBalance(accountState.userKeypair.publicKey());
      dispatch({ type: "UPDATE_ACCOUNT_BALANCES", payload: balances });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast({
        title: "Cannot complete transaction",
        description: err.message,
        status: "error",
        duraction: 2000,
        position: "buttom-start",
      });
    }
  };

  return (
    <Flex marginTop={"20"} alignItems={"center"} direction={"column"}>
      <Box>
        <Heading marginBottom="5">Send XLM</Heading>
        <InputGroup>
          <Input
            placeholder="Destination account"
            value={destinationAccount}
            onChange={handleDestinationChange}
          />
          <Input
            marginLeft={"5px"}
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={handleAmountChange}
          />
          <Button
            disabled={loading}
            onClick={paymentSubmit}
            marginLeft={"5px"}
            colorScheme={"green"}
            paddingX="10"
          >
            Submit
          </Button>
        </InputGroup>
      </Box>
    </Flex>
  );
}
