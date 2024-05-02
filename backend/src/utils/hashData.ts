import bcrypt from 'bcrypt';

export const hashData = async (data: any, saltRounds = 8): Promise<any> => {
  try {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData;
  } catch (error) {
    throw new Error(`Error hashing. ${error as string}`);
  }
};

export const verifyHashedData = async (
  unhashed: any,
  hashed: any
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(unhashed, hashed);
    return match;
  } catch (error) {
    throw new Error(
      `Error in comparing hashed string with entered string. ${error as string}`
    );
  }
};
