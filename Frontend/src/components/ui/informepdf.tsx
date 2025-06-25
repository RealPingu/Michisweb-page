type Medicamento = {
  nombre: string;
  stock: number;
  concentracion: string;
  laboratorio: string;
  vencimiento: string;
};

type Ingrediente = {
  name: string;
  description: string;
  medicamentos: Medicamento[];
};

const InformePDF = ({ ingrediente }: { ingrediente: Ingrediente }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "40px",
        fontFamily: "sans-serif",
        fontSize: "12pt",
        backgroundColor: "white",
      }}
    >
      <h1 style={{ fontSize: "20pt", marginBottom: "16px" }}>
        Informe de Stock
      </h1>
      <h2 style={{ fontSize: "16pt", marginBottom: "8px" }}>
        {ingrediente.name}
      </h2>
      <p style={{ marginBottom: "24px" }}>{ingrediente.description}</p>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Nombre</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Concentración</th>
            <th style={thStyle}>Laboratorio</th>
            <th style={thStyle}>Vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {ingrediente.medicamentos.map((med, idx) => (
            <tr key={idx}>
              <td style={tdStyle}>{med.nombre}</td>
              <td style={tdStyle}>{med.stock}</td>
              <td style={tdStyle}>{med.concentracion}</td>
              <td style={tdStyle}>{med.laboratorio}</td>
              <td style={tdStyle}>{med.vencimiento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#f0f0f0",
  fontWeight: "bold" as const,
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
};

export default InformePDF;
