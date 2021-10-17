const getUpdatedData = () => {
  // ....
};

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState !== 'visible') {
    return;
  }
  getUpdatedData();
});
