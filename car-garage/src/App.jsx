import { useState } from "react";

const initialCars = [
  { id: 1, brand: "Porsche", model: "911 Carrera", year: 2022 },
  { id: 2, brand: "Ferrari", model: "812 Superfast", year: 2021 },
  { id: 3, brand: "Mercedes", model: "AMG GT", year: 2023 },
  { id: 4, brand: "Lamborghini", model: "Huracan STO", year: 2022 },
  { id: 5, brand: "BMW", model: "M5 Competition", year: 2024 },
  { id: 6, brand: "Audi", model: "RS7", year: 2021 },
  { id: 7, brand: "McLaren", model: "720S", year: 2023 },
  { id: 8, brand: "Tesla", model: "Roadster", year: 2026 },
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
  const [yearFilter, setYearFilter] = useState("all");
  const [isForSale, setIsForSale] = useState(false);
  const [gearbox, setGearbox] = useState("Automatyczna");
  const [fuel, setFuel] = useState("petrol");
  const [error, setError] = useState("");

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
  const filterCars = cars.filter((car) => {
    const matchesSearch = car.brand
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesYear = yearFilter === "all" || String(car.year) === yearFilter;
    return matchesSearch && matchesYear;
  });
  const sortedCars = filterCars.sort((a, b) => {
    if (sortBy === "asc") {
      return a.brand.localeCompare(b.brand);
    } else {
      return b.brand.localeCompare(a.brand); //alfabetycznie porownoje marke 1 auta z 2
    }
  });

  const start = (currentPage - 1) * carPerPage;
  const end = start + carPerPage;
  const totalPages = Math.ceil(sortedCars.length / carPerPage);

  const pageCars = sortedCars.slice(start, end);
  return (
    <div>
      <h1>My Car Garage</h1>
      <div>
        <label>Search</label>
        <input
          type="text"
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
            setCurrentPage(1);
          }}
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
        <select
          value={yearFilter}
          onChange={(event) => setYearFilter(event.target.value)}
        >
          <option value="all">Wszystkie lata</option>
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
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
        <label>
          <input
            type="checkbox"
            checked={isForSale}
            onChange={(event) => setIsForSale(event.target.checked)}
          />
          Na sprzedaż
        </label>

        {error !== "" && <p>{error}</p>}

        <button
          onClick={() => {
            if (brandInput.trim() === "" || modelInput.trim() === "") {
              setError("Marka i model są wymagane");
              return;
            }
            addCar({
              id: Date.now(),
              brand: brandInput,
              model: modelInput,
              year: yearInput,
              isForSale: isForSale,
              gearbox: gearbox,
              fuel: fuel,
            });
            setBrandInput("");
            setModelInput("");
            setYearInput("");
            setIsForSale(false);
            setGearbox("Automatyczna");
            setFuel("petrol");
            setError("");
          }}
        >
          Add
        </button>
      </div>

      <label>
        <input
          type="radio"
          name="gearbox"
          value="Automatyczna"
          checked={gearbox === "Automatyczna"}
          onChange={(event) => setGearbox(event.target.value)}
        />
        Automatyczna
      </label>

      <label>
        <input
          type="radio"
          name="gearbox"
          value="Manualna"
          checked={gearbox === "Manualna"}
          onChange={(event) => setGearbox(event.target.value)}
        />
        Manualna
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="fuel"
          value={"petrol"}
          checked={fuel === "petrol"}
          onChange={(event) => setFuel(event.target.value)}
        />
        petrol
      </label>

      <label>
        <input
          type="radio"
          name="fuel"
          value={"diesel"}
          checked={fuel === "diesel"}
          onChange={(event) => setFuel(event.target.value)}
        />
        diesel
      </label>

      <ul>
        {pageCars.map((car) => (
          <li key={car.id}>
            {car.brand} {car.model} ({car.year})
            <span>
              {" "}
              {car.gearbox}
              <span> {car.fuel}</span>
            </span>
            {car.isForSale && <span> na sprzedaż</span>}
            <button onClick={() => deleteCar(car)}>delete</button>
          </li>
        ))}
      </ul>
      {filterCars.length === 0 && <p>Brak wyników</p>}
      <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>
        previous
      </button>
      <button
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
      >
        next
      </button>
      <p>
        strona {currentPage} z {totalPages}
      </p>
    </div>
  );
}
