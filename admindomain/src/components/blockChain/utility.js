import Web3 from 'web3';

import { CHAIN_ID, CHAIN_NAME, NETWORKS } from './constants';
import { NETWORK_CONFIGS } from './config';
// import { disconnect as walletConnectDisconnect } from '../walletConnect';
import { DEFAULT_NETWORK } from './constants';
import { TOKENS } from './tokenConfig';

const isWalletAddressValid = ({ address }) => {
  const web3 = new Web3(process.env.REACT_APP_WEB3_PROVIDER);
  return web3.utils.isAddress(address);
};

const getGasPrice = async ({ web3 }) => {
  const gasPrice = await web3.eth.getGasPrice();
  return web3.utils.toBN(gasPrice).add(web3.utils.toBN('20000000000'));
};

const toWei = ({ web3, amount, decimals = 14 }) => {
  return web3.utils.toWei(
    parseFloat(amount).toFixed(decimals).toString(),
    'ether'
  );
};

const showBalance = async ({ web3, account }) => {
  const walletBalance = await web3.eth.getBalance(account);
  const fromWei = await Web3.utils.fromWei(walletBalance, 'ether');
  return fromWei;
};

const checkSufficientBalance = async ({
  web3,
  connectedAccount,
  amount,
  setLoading,
}) => {
  const walletBalance = await web3.eth.getBalance(connectedAccount);

  if (parseInt(walletBalance) < parseInt(amount)) {
    // showToaster("You don't have sufficient balance to purchase this product. Please topup your wallet with cryto curency. Thank you.")
    return false;
  }
  return true;
};

const handleError = ({ error, anotherError }) => {
  const errorMessage =
    error?.message ||
    anotherError ||
    (error && 'Transaction has been failed please try again!!');

  if (errorMessage) {
    // clear wallet details from store
    // showToaster(errorMessage)
  }
};

const getNetworkId = async ({ networkId, web3 }) => {
  let blockchainNetworkId = networkId;
  if (!networkId && web3) {
    blockchainNetworkId = await web3.eth.net.getId();
  }
  return blockchainNetworkId;
};

const checkNetwork = async ({
  blockchainNetwork,
  networkGeneric,
  networkId,
  web3,
}) => {
  const blockchainNetworkId = await getNetworkId({ networkId, web3 });
  let incorrectNetwork = false;
  let correctNetworks;

  if (!networkGeneric && blockchainNetwork) {
    incorrectNetwork =
      parseInt(blockchainNetworkId) !== parseInt(CHAIN_ID[blockchainNetwork]);
    correctNetworks = CHAIN_NAME[blockchainNetwork];
  } else {
    incorrectNetwork =
      parseInt(blockchainNetworkId) !== parseInt(CHAIN_ID[NETWORKS.ETHEREUM]);
    correctNetworks = `${CHAIN_NAME[NETWORKS.ETHEREUM]}
    `;
  }
  // if (incorrectNetwork) {
  //   // clear wallet details from store
  //   await walletConnectDisconnect();
  //   // showToaster('Connect to wallet and please choose the blockchain network ' + correctNetworks)
  //   return false;
  // }
  return incorrectNetwork;
};

const getNetworkFromChainId = ({ networkId }) => {
  let blockchainNetwork;
  if (parseInt(CHAIN_ID[NETWORKS.POLYGON]) === parseInt(networkId)) {
    blockchainNetwork = NETWORKS.POLYGON;
  } else if (parseInt(CHAIN_ID[NETWORKS.ETHEREUM]) === parseInt(networkId)) {
    blockchainNetwork = NETWORKS.ETHEREUM;
  } else if (parseInt(CHAIN_ID[NETWORKS.SOLANA]) === parseInt(networkId)) {
    blockchainNetwork = NETWORKS.SOLANA;
  }
  return blockchainNetwork;
};

const disconnectAllWallets = async ({
  showMessage,
  blockchainNetwork,
  dispatch,
  message,
}) => {
  // await walletConnectDisconnect();
  // clear wallet details from store
  if (showMessage) {
    // showToaster(message || 'Wallet Disconnected')
  }
};

const getNetworkConfigured = ({ blockchainNetwork }) => {
  return NETWORK_CONFIGS[blockchainNetwork][
    process.env.REACT_APP_BLOCKCHAIN_NETWORK
  ];
};
const networkConfig = getNetworkConfigured({
  blockchainNetwork: DEFAULT_NETWORK,
});
const fromTokenWei = (tokenFrom, tokenBalance) => {
  const decimals = TOKENS[tokenFrom]?.decimals;
  const weiAmount = tokenBalance / 10 ** decimals;
  return weiAmount;
};

const walletTokenBalance = async ({
  web3,
  tokenFromABI,
  tokenFrom,
  walletAddress,
}) => {
  if (!web3) {
    return 0;
  }

  const TokenFromAddress = networkConfig[tokenFrom];
  const contract = await new web3.eth.Contract(tokenFromABI, TokenFromAddress);
  const tokenBalance = await contract.methods.balanceOf(walletAddress).call();
  const exactBalance = fromTokenWei(tokenFrom, tokenBalance);

  return exactBalance;
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export {
  getGasPrice,
  toWei,
  checkSufficientBalance,
  handleError,
  isWalletAddressValid,
  checkNetwork,
  getNetworkId,
  getNetworkFromChainId,
  showBalance,
  disconnectAllWallets,
  getNetworkConfigured,
  walletTokenBalance,
  fromTokenWei,
  sleep,
};
