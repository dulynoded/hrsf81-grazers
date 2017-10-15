const accessCodeLength = 8;
const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';

// temp hard code, will replace with encryption/hash function
const linkMap = {
  event_id: 1,
  group_id: 4
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
  linkMap,
};
