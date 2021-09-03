export const RECORD_NAME = "TODO_LIST";

export const retrieveList = () => {
  try {
    const record = localStorage.getItem(RECORD_NAME);
    if (record) {
      return JSON.parse(record);
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const storeList = (data) => {
  try {
    localStorage.setItem(RECORD_NAME, JSON.stringify(data));
  } catch (error) {
    console.log(error);
  }
};
