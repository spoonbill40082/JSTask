import dayjs from "dayjs";

const generateNewId = () => {
  return `${dayjs().format("YYYYMMDDHHmmssss")}`;
};
export default generateNewId;
