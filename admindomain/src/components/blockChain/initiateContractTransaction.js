// import { json } from 'react-router-dom';
// import { toWei, checkSufficientBalance, getGasPrice } from './utility';
// import transactionErrorHandler from './TransactionErrorHandler';
// import { Notifications } from '../../components/common/Toaster';

const initiateContractTransaction = async ({
  web3,
  contractFunction,
  // contractAddress,
  address,
  amountValue,
  tokenFromDecimals,
}) => {
  // const networkResult = await checkNetwork({
  //   blockchainNetwork: DEFAULT_NETWORK,
  //   networkGeneric: false,
  //   web3,
  // });
  // console.log('networkResult')
  // console.log(networkResult)
  // if (!networkResult) {
  //   // showToaster(`Connected to incorrect network`);
  //   return false;
  // }

  const toWei = ({ web3, amount, decimals = 14 }) => {
    return web3.utils.toWei(
      parseFloat(amount).toFixed(decimals).toString(),
      'ether'
    );
  };

  const amount = amountValue
    ? toWei({ web3, amount: amountValue, decimals: tokenFromDecimals || 18 })
    : '0x0';

  // const balanceResponse = await checkSufficientBalance({
  //   web3,
  //   connectedAccount: address,
  //   amount,
  // });

  // if (!balanceResponse) {
  //   // showToaster(`You dont have sufficient balance`);
  //   return false;
  // }

  // const gasPrice = await getGasPrice({ web3 });

  const transactionInput = {
    from: address,
    // value: amount,
    // gasPrice: gasPrice,
  };

  let result = null;
  let gasEstimated = null;

  // try {
  //   gasEstimated = await web3.eth.estimateGas({
  //     to: contractAddress,
  //     data: contractFunction.encodeABI(),
  //     ...transactionInput,
  //   });

  //   // const block = await web3.eth.getBlock("latest");
  //   // console.log('block')
  //   // console.log(block)
  //   // const gasEstimated = block.gasLimit
  //   console.log('gasEstimated');
  //   console.log(gasEstimated);
  // } catch (error) {
  //   console.error('estimateGas error');
  //   console.error(error);

  //   // transactionErrorHandler(error);

  //   return false;
  // }

  try {
    result = await contractFunction.send({
      ...transactionInput,
      // gas: gasEstimated,
    });
  } catch (error) {
    console.error('error');
    console.error(error);
    // Notifications(error.message, 'error');

    // showToaster(error);
  }

  if (!result || !result.status) {
    // showToaster('Error');
  }

  return result;
};

export default initiateContractTransaction;
