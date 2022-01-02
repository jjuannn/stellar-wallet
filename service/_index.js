import StellarSDK from "stellar-sdk";

const serverInstance = new StellarSDK.Server(
  "https://horizon-testnet.stellar.org"
);

export default serverInstance;
