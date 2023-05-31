import { useEffect } from "react";
import { useSelector } from "react-redux";

const Foods = () => {
  const userDto = useSelector((state) => state.userDto);

  useEffect(() => {
    console.log(userDto);
  }, []);

  return <></>;
};

export default Foods;
