import { API_ENDPOINT } from "@/lib/api";
import { LineChart } from "@tremor/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { collegeOptions2, programOptions } from "../../../lib/inputOptions";

const StatisticsGraph = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState("CEA");
  const [selectedCategories, setSelectedCategories] = useState([]);  // Change this to an array

  const handleCollegeChange = (event) => {
    setSelectedCollege(event.target.value);
    setSelectedCategories([]);  // Reset selected categories when college changes
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((cat) => cat !== category)
        : [...prevSelectedCategories, category]  // Add category if not selected
    );
  };

  const fetchAppointments = async () => {
    const response = await fetch(
      `${process.env.BASE_URL}${API_ENDPOINT.STUDENT_GET_ALL_DONE_APPOINTMENTS}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );
    const data = await response.json();
    setAppointments(data);
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const processData = () => {
    const data = {};
    const filteredAppointments = appointments.filter(
      (appointment) => appointment.student.college === selectedCollege
    );

    const programLabels = programOptions[selectedCollege].reduce((acc, program) => {
      if (program.value) acc[program.value] = program.label;
      return acc;
    }, {});

    filteredAppointments.forEach((appointment) => {
      const { appointmentDate: date, student } = appointment;
      const programLabel = programLabels[student.program] || student.program;

      if (!data[date]) {
        data[date] = {};
      }

      if (!data[date][programLabel]) {
        data[date][programLabel] = 0;
      }

      data[date][programLabel]++;
    });

    const result = [];
    Object.keys(data).forEach((date) => {
      const programs = data[date];
      const entry = { date };

      Object.keys(programs).forEach((program) => {
        entry[program] = programs[program];
      });

      result.push(entry);
    });

    return result;
  };

  const chartData = processData();

  const dynamicCategories = Object.keys(
    appointments
      .filter((appointment) => appointment.student.college === selectedCollege)
      .reduce((acc, appointment) => {
        const programLabels = programOptions[selectedCollege].reduce((acc, program) => {
          if (program.value) acc[program.value] = program.label;
          return acc;
        }, {});

        const programLabel = programLabels[appointment.student.program] || appointment.student.program;
        acc[programLabel] = true;
        return acc;
      }, {})
  );

  // Define a color mapping for categories
  const colorPalette = [
    "red", "blue", "green", "orange", "purple",
    "yellow", "pink", "cyan", "lime", "teal",
    "brown", "magenta", "gold", "navy", "olive",
    "indigo", "coral"
  ];

  const categoryColors = dynamicCategories.reduce((acc, category, index) => {
    acc[category] = colorPalette[index % colorPalette.length];
    return acc;
  }, {});

  return (
    <div className="col-span-2 bg-white dark:bg-bgDark2 p-7 rounded-3xl shadow-md">
      <h2 className="text-xl font-medium mb-4 text-textDark dark:text-white">
        Appointments Over Time
      </h2>
      <div>
        <label htmlFor="college">Select College/Department:</label>
        <select
          id="college"
          value={selectedCollege}
          onChange={handleCollegeChange}
          className="form-select mt-1 block w-full text-black dark:text-white"
        >
          {collegeOptions2.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex space-x-2 mt-4 font-semibold ">
        {dynamicCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded-lg ${selectedCategories.includes(category)
              ? "bg-gold text-maroon"
              : "bg-gray-200 text-maroon"
              }`}
          >
            {category}
          </button>
        ))}
      </div>
      <LineChart
        className="h-72 w-full bg-white dark:bg-bgDark2 mt-4"
        data={chartData}
        index="date"
        valueFormatter={(value) => value.toString()}
        categories={selectedCategories.length > 0 ? selectedCategories : dynamicCategories}
        colors={
          selectedCategories.length > 0
            ? selectedCategories.map((category) => categoryColors[category])
            : dynamicCategories.map((category) => categoryColors[category])
        }
        yAxisWidth={60}
        showAnimation={true}
        curveType="monotone"
      />
    </div>
  );
};

export default StatisticsGraph;
