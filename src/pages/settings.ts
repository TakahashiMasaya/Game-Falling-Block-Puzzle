const preventDefault = (e: Event) => e.preventDefault();

export const addEvent = () => {
  window.addEventListener('touchstart', preventDefault, { passive: false });
  window.addEventListener('touchmove', preventDefault, { passive: false });
};

export const removeEvent = () => {
  window.removeEventListener('touchstart', preventDefault);
  window.removeEventListener('touchmove', preventDefault);
};
