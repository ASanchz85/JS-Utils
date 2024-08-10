import { TOAST_TYPES } from './toastTypes';

export const renderToast = (toast) => {
  let message = ''

  switch (toast.type) {
    case TOAST_TYPES.SUCCESS:
      message = `This is a ${toast.type} toast`
      break
    case TOAST_TYPES.ERROR:
      message = `This is a ${toast.type} toast`
      break
    case TOAST_TYPES.WARNING:
      message = `This is a ${toast.type} toast`
      break
    case TOAST_TYPES.INFO:
    default:
      message = 'This is an info toast'
      break
  }

  return message
}
