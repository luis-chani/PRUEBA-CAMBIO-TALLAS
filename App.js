import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

export default function App() {
  const [codigo, setCodigo] = useState("");
  const [datos, setDatos] = useState(null);
  const [usados, setUsados] = useState(new Set());
  const [tallas, setTallas] = useState({});
  const [workersData, setWorkersData] = useState({});

  useEffect(() => {
    fetch("/workers.json")
      .then((res) => res.json())
      .then((data) => setWorkersData(data));
  }, []);

  const prendasPorConvenio = {
    Empleado: ["Casaca", "Chompa", "Térmico", "Mameluco", "Camisa", "Pantalón", "Zapato"],
    Staff: ["Casaca", "Chompa", "Camisa", "Pantalón", "Térmico", "Zapato"],
    Funcionario: ["Casaca", "Chompa", "Chaleco", "Camisa", "Pantalón", "Zapato"],
  };

  const handleCodigoChange = (e) => {
    setCodigo(e.target.value);
  };

  const buscarTrabajador = () => {
    if (usados.has(codigo)) {
      alert("Este código ya ha sido usado.");
      return;
    }
    if (workersData[codigo]) {
      setDatos(workersData[codigo]);
    } else {
      alert("Código no encontrado.");
    }
  };

  const handleTallaChange = (prenda, valor) => {
    setTallas({ ...tallas, [prenda]: valor });
  };

  const registrarTallas = () => {
    alert("Tallas registradas: " + JSON.stringify(tallas));
    setUsados(new Set(usados).add(codigo));
    setCodigo("");
    setDatos(null);
    setTallas({});
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Registro de Tallas</h1>
      <input
        type="text"
        value={codigo}
        onChange={handleCodigoChange}
        placeholder="Ingrese código de trabajador"
        className="border p-2 mb-2"
      />
      <button onClick={buscarTrabajador} className="bg-blue-500 text-white p-2 mb-4">
        Buscar
      </button>
      {datos && (
        <div className="border p-4 w-80">
          <p><strong>Nombre:</strong> {datos.nombre}</p>
          <p><strong>Convenio:</strong> {datos.convenio}</p>
          <h2 className="font-bold mt-2">Selecciona las tallas:</h2>
          {prendasPorConvenio[datos.convenio].map((prenda) => (
            <div key={prenda} className="mt-1">
              <label>{prenda}: </label>
              <input
                type="text"
                value={tallas[prenda] || ""}
                onChange={(e) => handleTallaChange(prenda, e.target.value)}
                className="border p-1"
              />
            </div>
          ))}
          <button onClick={registrarTallas} className="bg-green-500 text-white p-2 mt-4 w-full">
            Registrar
          </button>
        </div>
      )}
    </div>
  );
}
