import Instance from './instance';

export default {
  login: (data) => Instance.post('/auth/login', data),
  setsignup: (data) => Instance.post('/signup', data),
  getHospitalData: () => Instance.get('/hospital'),
  getDoctorData: () => Instance.get('/doctor'),
  getDepartmentData: () => Instance.get('/department'),
  getVaccineData: () => Instance.get('/vaccination/vaccine'),
  setchangepassword: (data) => Instance.patch('/changepassword', data),
  Consultation: (data) => Instance.post('/consultation/add', data),
  getConsultationData: () => Instance.get('/consultation'),
  getConsultation: () => Instance.get('/consultation/list'),
  viewconsultationbyid: (id) => Instance.get(`/consultation/${id}`),
  getpatientByID: (id) => Instance.get(`/consultation/list/${id}`),
  SetconsultationCertificate: (data) =>
    Instance.post('/consultation/certificate', data),
  Vaccination: (data) => Instance.post('/vaccination/add', data),
  getVaccinationData: () => Instance.get('/vaccination'),
  getallvaccination: () => Instance.get('/vaccination/list'),
  viewvaccinationbyid: (id) => Instance.get(`/vaccination/${id}`),
  getVaccinatedPatientByID: (id) => Instance.get(`/vaccination/list/${id}`),
  SetvaccinationCertificate: (data) =>
    Instance.post('/vaccination/certificate', data),
  getprofile: () => Instance.get('/profile'),
  Disease: (data) => Instance.post('/profile', data),
  editprofile: (data) => Instance.patch('/profile/edit', data),
  getTranaction: () => Instance.get('/transaction'),
};
