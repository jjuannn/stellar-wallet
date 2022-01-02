import { useContext, useEffect } from "react";
import { accountContext } from "/context/account";
import Title from "/components/Title";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Stack,
  Input,
  Button,
  useClipboard,
} from "@chakra-ui/react";
import router from "next/router";
import Link from "next/link";

export default function AccountCreatedSuccessfully() {
  const { accountState } = useContext(accountContext);

  const { hasCopied: hasCopiedSecret, onCopy: onSecretCopy } = useClipboard(
    accountState.userKeypair?.secret()
  );

  const { hasCopied: hasCopiedPublic, onCopy: onPublicCopy } = useClipboard(
    accountState.userKeypair?.publicKey()
  );

  useEffect(() => {
    if (!accountState.userKeypair) {
      router.push("/");
    }
  }, [accountState]);

  return (
    <>
      <Flex
        justifyContent={"center"}
        marginTop={"5"}
        alignItems={"center"}
        direction="column"
      >
        <Title
          title={"Account created successfully"}
          subtitle={"Please remember your key-pair"}
        />
      </Flex>
      <Box marginTop={"20"}>
        <Stack margin="auto" maxWidth={"500px"}>
          <FormControl>
            <FormLabel>Private key</FormLabel>
            <Input readOnly value={accountState.userKeypair?.secret()} />
            <Button onClick={onSecretCopy} colorScheme={"green"} marginY={"2"}>
              {hasCopiedSecret ? "Copied!" : "Copy"}
            </Button>
          </FormControl>
          <FormControl>
            <FormLabel>Public key</FormLabel>
            <Input readOnly value={accountState.userKeypair?.publicKey()} />
            <Button onClick={onPublicCopy} colorScheme={"green"} marginY={"2"}>
              {hasCopiedPublic ? "Copied!" : "Copy"}
            </Button>
          </FormControl>
        </Stack>
      </Box>
      <Button
        padding={"0"}
        margin="auto"
        width={"fit-content"}
        colorScheme={"facebook"}
      >
        <Link passHref href={"/dashboard"}>
          <a style={{ display: "block", padding: "1rem" }}>
            Continue to dashboard
          </a>
        </Link>
      </Button>
    </>
  );
}
