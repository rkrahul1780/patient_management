import service from '../api/service';
export const createcontact = (data) => async (dispatch) => {
  await service.contact(data).then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'SET_CONTACT',
        payload: data,
      });
    }
  });
};
export const verifyconsultationcertificate = (data) => async (dispatch) => {
  console.log('data', data);
  await service.Verifyconsultationcertificate(data).then((e) => {
    if (e.data.success === true) {
      dispatch({
        type: 'VERIFY_CONSULTATION',
        payload: data,
      });
    }
  });
};
