export default async function activateAccount(publicKey) {
  return await fetch(
    `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
  );
}
