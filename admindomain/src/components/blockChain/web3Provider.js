import { MetaMaskWeb3 } from '../metamask';
import { WalletConnectWeb3 } from '../walletConnect';
import { getNetworkConfigured } from './utility';

const getweb3Provider = ({ walletselect, blockchainNetwork }) => {
  // // let web3 = null;
  // // if (walletAccountStore && walletAccountStore.account) {
  const web3 = getWeb3(walletselect, blockchainNetwork);
  return web3;
};

const getWeb3 = (walletselect, blockchainNetwork) =>
  ({
    Metamask: MetaMaskWeb3,
    'Coinbase Wallet': MetaMaskWeb3,
    Walletconnect: WalletConnectWeb3(
      getNetworkConfigured({ blockchainNetwork }).RPC
    ),
  }[walletselect]);

export default getweb3Provider;
