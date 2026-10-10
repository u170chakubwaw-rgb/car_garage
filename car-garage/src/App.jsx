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
  

  const deleteCar = (carToDelete) => {
    const newCars = cars.filter((car) => car.id !== carToDelete.id);
    setCars(newCars);
  };

  return (
    <div>
      <h1>My Car Garage</h1>
      
      <input 
        type="text" 
        value={search} 
        onChange={(event) => setSearch(event.target.value)} 
      />
      <p>{search}</p>

      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand} <button onClick={() => deleteCar(car)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}