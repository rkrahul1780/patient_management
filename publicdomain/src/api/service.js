import Instance from './instance';

export default {
  contact: (data) => Instance.post('/contact', data),
  Verifyconsultationcertificate: (data) =>
    Instance.post('/verify/consultation', data),
};
