import Web3 from 'web3';
import { useEffect } from 'react';
// import approveERC20 from './approveERC20';
import wrappedTokenDeposit from './wrappedTokenDeposit';
import wrappedTokenWithdraw from './wrappedTokenWithdraw';
import directTransfer from './directTransfer';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './Home';
import { REciptDataSent } from './actions';
const Functionalities = () => {
  const dispatch = useDispatch();
  const onClickButton = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();

    const netVer = await web3.eth.net.getId();

    const walletTest = wrappedTokenDeposit({
      web3,
      tokenDecimals: 18,
      amount: 0.000001,
      address: accounts[0],
      netVer,
      dispatch,
    });
  };
  const onClickWithdraw = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();

    const netVer = await web3.eth.net.getId();

    wrappedTokenWithdraw({
      web3,
      tokenDecimals: 18,
      amount: 0.000001,
      address: accounts[0],
      netVer,
    });
  };
  const onClickrecipt = async () => {
    dispatch(REciptDataSent());
  };
  const onClickDirect = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();

    const netVer = await web3.eth.net.getId();
    console.log('dfmndlldnd');
    directTransfer({
      web3,
      tokenDecimals: 18,
      amount: 0.000001,
      address: accounts[0],
      netVer,
    });
  };
  return (
    <div>
      <button
        onClick={onClickButton}
        style={{
          backgroundColor: 'orange',
          width: '20%',
          margin: '10% 5% 0% 0%',
          border: 'none',
          height: '10vh',
          borderRadius: '10px',
          fontSize: '1.4rem',
        }}
      >
        Transfer Eth
      </button>
      <button
        onClick={onClickWithdraw}
        style={{
          backgroundColor: 'black',
          color: 'white',
          width: '20%',
          margin: '10% 5% 0% 0%',
          border: 'none',
          height: '10vh',
          borderRadius: '10px',
          fontSize: '1.4rem',
        }}
      >
        Withdraw Eth
      </button>
      <button
        onClick={onClickrecipt}
        style={{
          backgroundColor: 'lightslategray',
          color: 'white',
          width: '20%',
          margin: '10% 5% 0% 0%',
          border: 'none',
          height: '10vh',
          borderRadius: '10px',
          fontSize: '1.4rem',
          cursor: 'pointer',
        }}
      >
        Transaction recipt
      </button>
      <button
        onClick={onClickDirect}
        style={{
          backgroundColor: 'lightsalmon',
          color: 'white',
          width: '20%',
          margin: '10% 5% 0% 0%',
          border: 'none',
          height: '10vh',
          borderRadius: '10px',
          fontSize: '1.4rem',
        }}
      >
        Transfer Fund
      </button>
    </div>
  );
};

export default Functionalities;
