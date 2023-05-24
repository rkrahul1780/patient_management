let networks;
const directTransfer = async ({
  address,
  web3,
  amount,
  tokenDecimals,
  netVer,
}) => {
  const tokenAddress = '0x72d46adf628719E83c67D1a3b91743f382355308';
  console.log('web3', web3);
  function getNetworkName(netVer) {
    networks = {
      1: 'Ethereum',
      56: 'Binance SC',
      137: 'Polygon',
      43114: 'Avalanche',
      //Testnets:
      3: 'Ropsten',
      4: 'Rinkeby',
      5: 'Goerli',
      42: 'Kovan',
      97: 'BSC Testnet',
      80001: 'Mumbai',
      11155111: 'Sepolia',
    };
    return networks[netVer];
  }

  console.log('getNetworkName(chainID) ', getNetworkName(netVer));
  //   if (networks === 'Mumbai') {
  // const smartContract = await new web3.eth.Contract(ABI, tokenAddress);

  // const depositFunction = smartContract.methods.deposit();
  const toWei = async (web3, amount, decimals = tokenDecimals) => {
    return await web3.utils.toWei(
      parseFloat(amount).toFixed(decimals).toString(),
      'ether'
    );
  };

  const getGasPrice = async (web3) => {
    const gasPrice = await web3.eth.getGasPrice();
    return web3.utils.toBN(gasPrice).add(web3.utils.toBN('20000000000'));
  };

  const AmountInWei = await toWei(web3, amount, tokenDecimals);
  console.log('AmountInWei', AmountInWei);
  const GetGasPricesss = await getGasPrice(web3);
  const result = await web3.eth.sendTransaction({
    from: address,
    to: tokenAddress,
    value: AmountInWei,
    GetGasPricesss,
  });
  console.log('result', result);
  //   }
  //   alert('Mumbai Network Only Supported');

  // if (result && result.status && result.transactionHash) {
  //   dispatch(addSwapValues(result.status));
  // }
  // return result;
};

export default directTransfer;
