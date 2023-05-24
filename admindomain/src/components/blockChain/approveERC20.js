import initiateContractTransaction from './initiateContractTransaction';
import getweb3Provider from './web3Provider';
import { DEFAULT_NETWORK } from './constants';
import { getNetworkConfigured } from '.';
import { toWei } from './utility';
import { addValues } from '../../components/common/redux/SmartContract';

const approveERC20 = async ({
  walletselect,
  address,
  amount,
  contractAddress,
  tokenFrom,
  tokenFromABI,
  tokenFromDecimals,
  dispatch,
}) => {
  const web3 = getweb3Provider({
    walletselect,
    blockchainNetwork: DEFAULT_NETWORK,
  });

  const networkConfig = getNetworkConfigured({
    blockchainNetwork: DEFAULT_NETWORK,
  });

  const TokenFromAddress = networkConfig[tokenFrom];

  const smartContract = await new web3.eth.Contract(
    tokenFromABI,
    TokenFromAddress
  );

  const approveFunction = smartContract.methods.approve(
    contractAddress,
    toWei({ web3, amount, decimals: tokenFromDecimals })
  );

  const result = await initiateContractTransaction({
    web3,
    contractFunction: approveFunction,
    contractAddress: TokenFromAddress,
    address,
    tokenFromDecimals,
  });

  dispatch(addValues(result));

  return result;
};

export default approveERC20;
