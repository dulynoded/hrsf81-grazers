const accessCodeLength = 8;
const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

// temp hard code, will replace with encryption/hash function
const groupMap = {
  1: 'wqrqrrrvvffxawasdfaf4qrrsdvdbn',
  4: 'awerweikjnkasnfwf092324234nsaf',
};

const accessCode = (n = accessCodeLength) => {
  let str = '';
  for (let i = 0; i < n; i += 1) {
    const random = Math.floor(alphabets.length * Math.random());
    str += alphabets[random];
  }
  return str;
};

module.exports = {
  accessCode,
  groupMap,
};
