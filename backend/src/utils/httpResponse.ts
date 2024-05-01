export const httpResponse = (
  success: boolean,
  message: string,
  data: any = {},
  page: number = 1
): Object => {
  return Object.freeze({
    success,
    message,
    page,
    data,
  });
};
