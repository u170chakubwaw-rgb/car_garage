import { useState } from "react";

const initialCars = [
  { id: 1, brand: "Porsche", model: "911 Carrera", year: 2022 },
  { id: 2, brand: "Ferrari", model: "812 Superfast", year: 2021 },
  { id: 3, brand: "Mercedes", model: "AMG GT", year: 2023 },
  { id: 4, brand: "Lamborghini", model: "Huracan STO", year: 2022 },
  { id: 5, brand: "BMW", model: "M5 Competition", year: 2024 },
  { id: 6, brand: "Audi", model: "RS7", year: 2021 },
  { id: 7, brand: "McLaren", model: "720S", year: 2023 },
  { id: 8, brand: "Tesla", model: "Roadster", year: 2025 },
  { id: 9, brand: "Porsche", model: "Panamera", year: 2025 },
];

export default function App() {
  const [cars, setCars] = useState(initialCars);
  const [search, setSearch] = useState("");
  const [brandInput, setBrandInput] = useState("");
  const [modelInput, setModelInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [sortBy, setSortBy] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const carPerPage = 5;

  //usuwanie aut
  const deleteCar = (carToDelete) => {
    const newCars = cars.filter((car) => car.id !== carToDelete.id);
    setCars(newCars);
  };

  //dodawanie aut
  const addCar = (carToAdd) => {
    setCars([...cars, carToAdd]);
  };

  //wyszukiwanie po marce auta
  const filterCars = cars.filter((car) =>
    car.brand.toLowerCase().includes(search.toLowerCase()),
  );
  const sortedCars = filterCars.sort((a, b) => {
    if (sortBy === "asc") {
      return a.brand.localeCompare(b.brand);
    } else {
      return b.brand.localeCompare(a.brand);
    }
  });

  const start = (currentPage - 1) * carPerPage;

  const end = start + carPerPage;
  const pageCars = sortedCars.slice(start, end);
  return (
    <div>
      <h1>My Car Garage</h1>

      <div>
        <label>Search</label>
        <input
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div>
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>
      </div>

      <div>
        <input
          type="text"
          value={brandInput}
          onChange={(event) => setBrandInput(event.target.value)}
        />
        <div>
          <input
            type="text"
            value={modelInput}
            onChange={(event) => setModelInput(event.target.value)}
          />
        </div>

        <div>
          <input
            type="text"
            value={yearInput}
            onChange={(event) => setYearInput(event.target.value)}
          />
        </div>

        {/* dodawanie aut */}

        <button
          onClick={() => {
            if (brandInput.trim() === "" || modelInput.trim() === "") {
              return;
            }
            addCar({
              id: Date.now(),
              brand: brandInput,
              model: modelInput,
              year: yearInput,
            });
            setBrandInput("");
            setModelInput("");
            setYearInput("");
          }}
        >
          Add
        </button>
      </div>

      <ul>
        {pageCars.map((car) => (
          <li key={car.id}>
            {car.brand} {car.model} ({car.year}){" "}
            <button onClick={() => deleteCar(car)}>delete</button>
          </li>
        ))}
      </ul>
      <button onClick={() => setCurrentPage(currentPage - 1)}>previous</button>
      <button onClick={() => setCurrentPage(currentPage + 1)}>next</button>
    </div>
  );
}
