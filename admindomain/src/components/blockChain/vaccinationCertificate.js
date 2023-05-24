import initiateContractTransaction from './initiateContractTransaction';
// import getweb3Provider from './web3Provider';
// import { DEFAULT_NETWORK, NATIVE_CURRENCY } from './constants';
// import { getNetworkConfigured } from '.';
import { useDispatch, useSelector } from 'react-redux';
// import { REciptDataSent } from './actions';

// import { addSwapValues } from '../../components/common/redux/Approval';
import VACCINATION_ABI from './VACCINE_ABI';
let networks;
const wrappedTokenWithdraw = async ({
  // walletselect,
  address,
  netVer,
  certificationValues,
  // accountNumber,
  web3,
  // amount,
  // tokenDecimals,
  // netVer,
  dispatch,
}) => {
  const tokenAddress = '0x535Ac607e72146218Bc5e7d3b71a37944a77025C';

  // function getNetworkName(netVer) {
  //   networks = {
  //     1: 'Ethereum',
  //     56: 'Binance SC',
  //     137: 'Polygon',
  //     43114: 'Avalanche',
  //     //Testnets:
  //     3: 'Ropsten',
  //     4: 'Rinkeby',
  //     5: 'Goerli',
  //     42: 'Kovan',
  //     97: 'BSC Testnet',
  //     80001: 'Mumbai',
  //     11155111: 'Sepolia',
  //   };
  //   return networks[netVer];
  // }

  // const { default: abi } = await VACCINATION_ABI;
  function generateRandomNumber() {
    const min = 1000000000; // Minimum 10-digit number (inclusive)
    const max = 9999999999; // Maximum 10-digit number (inclusive)

    const generatedNumbers = new Set();
    let randomNumber;

    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (generatedNumbers.has(randomNumber));

    generatedNumbers.add(randomNumber);

    return randomNumber.toString(); // Convert the number to a string
  }

  let random = generateRandomNumber();

  console.log('randomNumber', random);

  const value = certificationValues.issuerName;
  const slicedValue = value.split(' ')[0];
  console.log(slicedValue);

  const timeString = certificationValues.vaccineTakenDatetime;
  const [startTime, endTime] = timeString.split('-');
  const [startHour, startMinute] = startTime.split(':');
  const [endHour, endMinute] = endTime.split(':');

  const currentDate = new Date();
  const startTimestamp =
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      parseInt(startHour),
      parseInt(startMinute),
      0
    ).getTime() / 1000.0;

  const endTimestamp =
    new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      parseInt(endHour),
      parseInt(endMinute),
      0
    ).getTime() / 1000.0;

  console.log(Math.floor(startTimestamp));
  console.log(Math.floor(endTimestamp));
  if (netVer === 80001) {
    const smartContract = await new web3.eth.Contract(
      VACCINATION_ABI,
      tokenAddress
    );

    const patientName = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.patientName),
      64
    );
    const certificateNumber = random;
    const patientUUID = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.patientUUID),
      64
    );
    const patientRegId = certificationValues.patientRegId;
    const vaccineName = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.vaccineName),
      64
    );
    const vaccineTakenDatetime = Math.floor(endTimestamp);
    const disease = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.disease),
      64
    );
    const antigen = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.antigen),
      64
    );
    const issuerName = web3.utils.padRight(
      web3.utils.fromAscii(slicedValue),
      64
    );
    const issuerId = web3.utils.padRight(
      web3.utils.fromAscii(certificationValues.issuerId),
      64
    );
    const issuedDateTime = certificationValues.issuedDateTime;

    console.log('first', {
      certificateNumber,
      patientName,
      patientUUID,
      patientRegId,
      vaccineName,
      vaccineTakenDatetime,
      disease,
      antigen,
      issuerName,
      issuerId,
      issuedDateTime,
    });

    const createCertificationFunction =
      smartContract.methods.createCertification(
        certificateNumber,
        patientName,
        patientUUID,
        patientRegId,
        vaccineName,
        vaccineTakenDatetime,
        disease,
        antigen,
        issuerName,
        issuerId,
        issuedDateTime
      );

    const result = await initiateContractTransaction({
      web3,
      contractFunction: createCertificationFunction,
      contractAddress: tokenAddress,
      address,
      tokenDecimals: 18,
      amountValue: 0,
    });

    const subscription = await smartContract.events.CertificationEvent({
      fromBlock: result.blockNumber,
    });

    const decodedCertificateData = () => {
      return new Promise((resolve) => {
        subscription.on('data', (event) => {
          const eventReturn = event.returnValues;
          console.log('evenrReturnBefore', eventReturn);
          const startTimestamp = event.returnValues.issuedDateTime; // Example start timestamp
          const endTimestamp = event.returnValues.vaccineTakenDatetime; // Example end timestamp

          const startDate = new Date(startTimestamp * 1000);
          const endDate = new Date(endTimestamp * 1000);

          const startHours = startDate.getHours();
          const endHours = endDate.getHours();

          const startAMPM = startHours >= 12 ? 'PM' : 'AM';
          const endAMPM = endHours >= 12 ? 'PM' : 'AM';

          console.log(startAMPM);
          console.log(endAMPM);

          const returnedCertificates = {
            certificateNumber: eventReturn.certificateNumber,
            patientName: web3.utils.hexToUtf8(eventReturn.patientName),
            patientUUID: web3.utils.hexToUtf8(eventReturn.patientUUID),
            patientRegId: eventReturn.patientRegId,
            vaccineName: web3.utils.hexToUtf8(eventReturn.vaccineName),
            vaccineTakenDatetime: endHours + ':00' + endAMPM,
            disease: web3.utils.hexToUtf8(eventReturn.disease),
            antigen: web3.utils.hexToUtf8(eventReturn.antigen),
            issuerName:
              web3.utils.hexToUtf8(eventReturn.issuerName) + 'Hospitals',
            issuerId: web3.utils.hexToUtf8(eventReturn.issuerId),
            issuedDateTime: startHours + ':00' + startAMPM,
          };
          resolve(returnedCertificates);
        });
      });
    };

    const decodedCertificateDataReturn = await decodedCertificateData();

    console.log('decodedCertificateDataReturn', decodedCertificateDataReturn);

    return decodedCertificateDataReturn;
  } else {
    console.log('netVer', netVer);
    alert('Mumbai Network Only Supported');
  }
};

export default wrappedTokenWithdraw;
