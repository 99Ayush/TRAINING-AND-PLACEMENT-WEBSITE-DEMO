export const showToast = (message, type = 'success') => {
  window.dispatchEvent(new CustomEvent('showToast', { detail: { message, type } }));
};
