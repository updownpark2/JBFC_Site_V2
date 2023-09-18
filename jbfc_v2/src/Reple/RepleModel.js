export const makeCurrentTime = () => {
  const date = new Date();

  return `${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
};
