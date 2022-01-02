import serverInstance from "./_index";

export default async function checkBalance(publicKey) {
  const account = await serverInstance.loadAccount(publicKey);
  return account.balances;
}
