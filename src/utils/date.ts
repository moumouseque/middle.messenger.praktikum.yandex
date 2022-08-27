const convertToMessageDateTime = (date: string) => {
  const messageDate = new Date(date);

  return messageDate.toLocaleString();
};

export default convertToMessageDateTime;
