import service from '../api/service';
export const login = (data, navigate) => async (dispatch) => {
  console.log('data', data);
  await service.login(data).then((e) => {
    console.log('e', e);
    if (e.data.success === false) {
      localStorage.setItem('token', '');
      localStorage.setItem('Role', '');
    } else {
      localStorage.setItem('token', e.data.data.accessToken);
      localStorage.setItem('Role', e.data.data.role);
      // dispatch(setSuccessMessage(e.data.msg));
      navigate('/dashboard');
      // window.location.reload();
    }
  });
};

export const signup = (data) => async (dispatch) => {
  await service.setsignup(data);
  console.log('data', data);
  dispatch({
    type: 'SET_SIGNUP',
    payload: data,
  });
};
export const LogOut = (navigate) => async () => {
  localStorage.setItem('token', '');
  localStorage.setItem('Role', '');
  navigate('/auth/login');
  window.location.reload();
};
export const getAllHospital = (data) => async (dispatch) => {
  await service.getHospitalData(data).then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'SET_HOSPITAL_DATA',
        payload: e.data.data,
      });
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const getAllDoctor = (data) => async (dispatch) => {
  await service.getDoctorData(data).then((e) => {
    console.log('eeeeeVenue', e.data.data1);
    if (e.data.success === true) {
      dispatch({
        type: 'SET_DOCTOR_DATA',
        payload: e.data.data1,
      });
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const getAllDepartment = (data) => async (dispatch) => {
  await service.getDepartmentData(data).then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'SET_DEPARTMENT_DATA',
        payload: e.data.data,
      });
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const getAllVaccine = (data) => async (dispatch) => {
  await service.getVaccineData(data).then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'SET_VACCINE_DATA',
        payload: e.data.data,
      });
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const changepassword = (data) => async (dispatch) => {
  await service.setchangepassword(data);
  console.log('data', data);
  dispatch({
    type: 'SET_NEWPASSWORD',
    payload: data,
  });
};
export const createConsultation = (data, navigate) => async (dispatch) => {
  console.log('data', data);
  await service.Consultation(data).then((e) => {
    console.log('eeeee', e);
    if (e.data.success === true) {
      // dispatch(setSuccessMessage('Registered sucessfully'));
      dispatch({
        type: 'SET_CONSULTATION',
        payload: data,
      });
      navigate('/consultation');
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const getAllConsultation = (data) => async (dispatch) => {
  console.log('data))))', data);
  await service.getConsultationData(data).then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'SET_CONSULTATION_DATA',
        payload: e.data.data1,
      });
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const viewconsultation = (id) => async (dispatch) => {
  await service.viewconsultationbyid(id).then((e) => {
    console.log('aa', e);
    dispatch({
      type: 'VIEW_CONSULTATION',
      payload: e.data.data,
    });
  });
};
export const getPatientByID = (id, navigate) => async (dispatch) => {
  let { data } = await service.getpatientByID(id);
  console.log('datagetPatientByID', data);
  if (data.success) {
    dispatch({
      type: 'CONSULTATIONS_BY_ID',
      payload: data.data,
      successStatus: data.success,
      doctorData: data.doctorDataById,
      consultationData: data.consultationById,
    });
  } else {
  }
};
export const createVaccination = (data, navigate) => async (dispatch) => {
  console.log('data', data);
  await service.Vaccination(data).then((e) => {
    console.log('eeeee', e);
    if (e.data.success === true) {
      // dispatch(setSuccessMessage('Registered sucessfully'));
      dispatch({
        type: 'SET_VACCINATIONS',
        payload: data,
      });
      navigate('/vaccination');
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const getAllVaccination = (data) => async (dispatch) => {
  await service.getVaccinationData(data).then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'SET_VACCINATION_DATA',
        payload: e.data.data1,
      });
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const viewvaccination = (id) => async (dispatch) => {
  await service.viewvaccinationbyid(id).then((e) => {
    console.log('aa', e);
    dispatch({
      type: 'VIEW_VACCINATION',
      payload: e.data.data,
    });
  });
};
export const getConsultation = (data) => async (dispatch) => {
  await service.getConsultation(data).then((e) => {
    console.log('e', e);
    if (e.data.success === true) {
      dispatch({
        type: 'SET_CONSULTATION_DATA',
        payload: e.data.data,
      });
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const getVaccination = (data) => async (dispatch) => {
  await service.getallvaccination(data).then((e) => {
    console.log('e', e);
    if (e.data.success === true) {
      dispatch({
        type: 'SET_VACCINATION_DATA',
        payload: e.data.data1,
      });
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const getProfile = (data) => async (dispatch) => {
  await service.getprofile(data).then((e) => {
    console.log('e', e);
    if (e.data.success === true) {
      dispatch({
        type: 'GET_PROFILE_DATA',
        payload: e.data.data,
      });
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const createDisease = (data) => async (dispatch) => {
  console.log('data', data);
  await service.Disease(data).then((e) => {
    console.log('eeeee', e);
    if (e.data.success === true) {
      // dispatch(setSuccessMessage('Registered sucessfully'));
      dispatch({
        type: 'SET_DISEASE',
        payload: data,
      });
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const editProfile = (data, navigate) => async (dispatch) => {
  console.log('data*****', data);
  await service.editprofile(data).then((e) => {
    console.log('e', e);
    if (e.data.success === true) {
      dispatch({
        type: 'EDIT_PROFILE_DATA',
        payload: e.data.data,
      });
      navigate('/profile');
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
export const setconsultationCertificate =
  (formData, navigate) => async (dispatch) => {
    let { data } = await service.SetconsultationCertificate(formData);
    console.log('setconsultationCertificate', data);
  };

export const getvaccinatedPatientByID = (id, navigate) => async (dispatch) => {
  let { data } = await service.getVaccinatedPatientByID(id);
  console.log('getVaccinatedPatientByID', data);
  if (data.success) {
    dispatch({
      type: 'VACINATIONS_BY_ID',
      payload: data.data,
      successStatus: data.success,
      doctorData: data.doctorDataById,
      vacinationData: data.vacinationById,
    });
  } else {
  }
};
export const setvaccinationCertificate =
  (formData, navigate) => async (dispatch) => {
    let { data } = await service.SetvaccinationCertificate(formData);
    console.log('setconsultationCertificate', data);
  };
export const gettranaction = () => async (dispatch) => {
  await service.getTranaction().then((e) => {
    console.log('e', e);
    if (e.data.success === true) {
      dispatch({
        type: 'SET_TRANSACTION_DATA',
        payload: e.data.data,
      });
    } else {
      // dispatch(setErrorMessage(`${e.data.msg}`));
    }
  });
};
