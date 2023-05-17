import * as bcrypt from 'bcrypt';

export const generateRandomNumber = (length = 6) => {
  let randomNumber = '';
  for (let i = 0; i < length; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }
  return randomNumber;
};

export const hashData = async (data: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data, salt);
  return hash;
};

export const compareData = async (
  enteredData: string,
  dbData: string,
): Promise<boolean> => {
  const match = bcrypt.compare(enteredData, dbData);
  return match;
};
