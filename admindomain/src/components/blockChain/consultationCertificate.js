import initiateContractTransaction from './initiateContractTransaction';
// import getweb3Provider from './web3Provider';
// import { DEFAULT_NETWORK, NATIVE_CURRENCY } from './constants';
// import { getNetworkConfigured } from '.';
import { useDispatch, useSelector } from 'react-redux';
// import { REciptDataSent } from './actions';

// import { addSwapValues } from '../../components/common/redux/Approval';
import CONSULTATION_ABI from './WMATIC_ABI';
let networks;
const wrappedTokenDeposit = async ({
  // walletselect,
  address,
  // accountNumber,
  web3,
  certificationValues,
  // amount,
  // tokenDecimals,
  // netVer,
  dispatch,
}) => {
  // const web3 = getweb3Provider({
  //   walletselect,
  //   blockchainNetwork: DEFAULT_NETWORK,
  // });

  // const networkConfig = getNetworkConfigured({
  //   blockchainNetwork: DEFAULT_NETWORK,
  // });

  // const wrapped = NATIVE_CURRENCY[DEFAULT_NETWORK].WRAPPED;
  // const wrappedAbi = wrapped + '_ABI';
  // const tokenAddress = networkConfig[NATIVE_CURRENCY[DEFAULT_NETWORK].WRAPPED];
  const tokenAddress = '0xb85987bd100b2B211aD81A785E6a76592Fc29b60';

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

  // const { default: abi } = await CONSULTATION_ABI;
  // if (networks === 80001) {
  console.log('certificationValues', certificationValues);
  const smartContract = await new web3.eth.Contract(
    CONSULTATION_ABI,
    tokenAddress
  );

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
  const value = certificationValues.hospitalName;
  const slicedValue = value.split(' ')[0];
  console.log(slicedValue);
  // Unix convert
  const timeString = certificationValues.consultationTime;
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

  // Datas Input to Blockchain
  const certificateNumber = random;

  const patientName = web3.utils.padRight(
    web3.utils.fromAscii(certificationValues.patientName),
    64
  );
  console.log(
    'certificationValues.patientUUID',
    certificationValues.patientUUID
  );
  const patientUUID = web3.utils.padRight(
    web3.utils.fromAscii(certificationValues.patientUUID),
    64
  );
  const patientRegId = certificationValues.patientRegId;
  const doctorName = web3.utils.padRight(
    web3.utils.fromAscii(certificationValues.doctorName),
    64
  );
  const consultationTime = Math.floor(endTimestamp);
  const departmentName = web3.utils.padRight(
    web3.utils.fromAscii(certificationValues.departmentName),
    64
  );
  const hospitalName = web3.utils.padRight(
    web3.utils.fromAscii(slicedValue),
    64
  );
  const issuerName = web3.utils.padRight(web3.utils.fromAscii(slicedValue), 64);
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
    doctorName,
    consultationTime,
    departmentName,
    hospitalName,
    issuerName,
    issuerId,
    issuedDateTime,
  });

  const createCertificationFunction = smartContract.methods.createCertification(
    certificateNumber,
    patientName,
    patientUUID,
    patientRegId,
    doctorName,
    consultationTime,
    departmentName,
    hospitalName,
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

  console.log('result', result);
  // console.log(
  //   'toAscii',
  //   JSON.stringify(
  //     web3.utils.toAscii(
  //       '0x43617264696f6c6f677900000000000000000000000000000000000000000000'
  //     )
  //   )
  // );

  const subscription = await smartContract.events.CertificationEvent({
    fromBlock: result.blockNumber,
  });

  const decodedCertificateData = () => {
    return new Promise((resolve) => {
      subscription.on('data', (event) => {
        const eventReturn = event.returnValues;
        console.log('evenrReturnBefore', eventReturn);
        const startTimestamp = event.returnValues.issuedDateTime; // Example start timestamp
        const endTimestamp = event.returnValues.consultationTime; // Example end timestamp

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
          doctorName: web3.utils.hexToUtf8(eventReturn.doctorName),
          consultationTime: endHours + ':00' + endAMPM,
          departmentName: web3.utils.hexToUtf8(eventReturn.departmentName),
          hospitalName:
            web3.utils.hexToUtf8(eventReturn.hospitalName) + 'Hospitals',
          issuerName: web3.utils.hexToUtf8(eventReturn.issuerName),
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

  // const resultofverification = await smartContract.methods
  //   .verifyCertificateByPatientUUID(patientUUID)
  //   .call();
  // console.log(
  //   'resultofverification',
  //   web3.utils.hexToUtf8(resultofverification.departmentName)
  // );

  // const certificatebyUuid =
  //   smartContract.methods.verifyCertificateByPatientUUID(
  //     '0x3132330000000000000000000000000000000000000000000000000000000000'
  //   );

  // console.log('certificateEvent', certificateEvent);
  // const certificateByuuid = await initiateContractTransaction({
  //   web3,
  //   contractFunction: certificatebyUuid,
  //   contractAddress: tokenAddress,
  //   address,
  //   tokenDecimals: 18,
  //   amountValue: 0,
  // });
  // const CertificationFunction = smartContract.methods.certifications(1);
  // const resultgff = await initiateContractTransaction({
  //   web3,
  //   contractFunction: CertificationFunction,
  //   contractAddress: tokenAddress,
  //   address,
  //   tokenDecimals: 18,
  // });
  // console.log('result', result);
  // console.log('resultgff', resultgff);
  // console.log('CertificationFunction', CertificationFunction);

  // console.log('certificateByuuid', certificateByuuid);
  // if (result) {
  //   // dispatch(REciptDataSent({ transactionHash: result?.transactionHash }));
  //   console.log('result', result);
  // }

  // }
  // alert('Mumbai Network Only Supported');

  // if (result && result.status && result.transactionHash) {
  //   dispatch(addSwapValues(result.status));
  // }
  // return result;
};

export default wrappedTokenDeposit;
