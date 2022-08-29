import store from './store';
import { ServerError } from '../types/server-error';

const errorHandler = (error: string, message = '') => {
  let errorBody: string | ServerError;
  try {
    errorBody = JSON.parse(error);
  } catch (err) {
    errorBody = error;
  }

  const serverErrorMessage = typeof errorBody === 'string'
    ? errorBody
    : `${errorBody.error}. ${errorBody.reason}`;

  store.set('error', {
    errorMessage: serverErrorMessage,
    message,
  });
};

export default errorHandler;
