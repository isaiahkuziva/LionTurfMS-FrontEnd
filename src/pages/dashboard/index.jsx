import { useSelector } from "react-redux";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { reactSelectStyle } from "../../helpers/constants";

const animatedComponents = makeAnimated();

const Dashboard = () => {
  const currentTheme = useSelector((state) => state.theme.value);

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <>
      <div>Dashboard</div>
      <Select
        closeMenuOnSelect
        components={animatedComponents}
        options={options}
        styles={reactSelectStyle(currentTheme)}
      />
    </>
  );
};

export default Dashboard;
