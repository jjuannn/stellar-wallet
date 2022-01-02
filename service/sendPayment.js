import StellarSDK from "stellar-sdk";
import serverInstance from "./_index";

export default async function sendPayment(sourceAccount, destination, amount) {
  await serverInstance.loadAccount(destination);

  const source = await serverInstance.loadAccount(sourceAccount.publicKey());

  let transaction;
  transaction = new StellarSDK.TransactionBuilder(source, {
    fee: StellarSDK.BASE_FEE,
    networkPassphrase: StellarSDK.Networks.TESTNET,
  })
    .addOperation(
      StellarSDK.Operation.payment({
        destination,
        asset: StellarSDK.Asset.native(),
        amount,
      })
    )
    .setTimeout(180)
    .build();

  transaction.sign(sourceAccount);

  return serverInstance.submitTransaction(transaction);
}
