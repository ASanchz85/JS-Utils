export const renderToast = (toast) => {
    let toastStyle = '';

    switch (toast.type) {
      case TOAST_TYPES.SUCCESS:
        toastStyle = 'toast-success';
        break;
      case TOAST_TYPES.ERROR:
        toastStyle = 'toast-error';
        break;
      case TOAST_TYPES.WARNING:
        toastStyle = 'toast-warning';
        break;
      case TOAST_TYPES.INFO:
      default:
        toastStyle = 'toast-info';
        break;
    }

    return (
      <div key={toast.id} className={`toast ${toastStyle}`}>
        {toast.message}
      </div>
    );
  };
