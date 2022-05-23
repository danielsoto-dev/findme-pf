import { useState, useEffect } from "react";
export const useColombiaData = () => {
  const [colombiaData, setColombiaData] = useState([]);
  const [departments, setDepartments] = useState([]);
  useEffect(
    () =>
      fetch("/api/colombia")
        .then((response) => response.json())
        .then((data) => {
          const cleanDepartments = data.map((i) => i.departamento.normalize());
          setColombiaData(data);
          setDepartments(cleanDepartments);
        }),
    []
  );
  return { departments, colombiaData, setColombiaData, setDepartments };
};
