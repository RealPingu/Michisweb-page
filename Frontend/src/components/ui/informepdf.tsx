type LoteDetalle = {
  lote: string;
  fecha_vencimiento: string;
  cantidad: number;
  cantidad_defectuosa: number;
  cantidad_en_idea: number;
  cantidad_en_estado: number;
  cantidad_envase_roto: number;
  nombre_medicamento: string;
  concentracion: string;
  via_administracion: string;
};

type Ingrediente = {
  name: string;
  description: string;
  lotes: LoteDetalle[];
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
      <h1 style={{ fontSize: "20pt", marginBottom: "16px" }}>Informe de Stock</h1>
      <h2 style={{ fontSize: "16pt", marginBottom: "8px" }}>{ingrediente.name}</h2>
      <p style={{ marginBottom: "24px" }}>{ingrediente.description}</p>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={thStyle}>Medicamento</th>
            <th style={thStyle}>Concentración</th>
            <th style={thStyle}>Vía</th>
            <th style={thStyle}>Lote</th>
            <th style={thStyle}>Stock</th>
            <th style={thStyle}>Vencido</th>
            <th style={thStyle}>Mal estado</th>
            <th style={thStyle}>Envase roto</th>
            <th style={thStyle}>Fecha Vencimiento</th>
          </tr>
        </thead>
        <tbody>
          {ingrediente.lotes.map((lote, idx) => (
            <tr key={idx}>
              <td style={tdStyle}>{lote.nombre_medicamento}</td>
              <td style={tdStyle}>{lote.concentracion}</td>
              <td style={tdStyle}>{lote.via_administracion}</td>
              <td style={tdStyle}>{lote.lote}</td>
              <td style={tdStyle}>{lote.cantidad}</td>
              <td style={tdStyle}>{lote.cantidad_en_estado}</td>
              <td style={tdStyle}>{lote.cantidad_en_idea}</td>
              <td style={tdStyle}>{lote.cantidad_envase_roto}</td>
              <td style={tdStyle}>{lote.fecha_vencimiento}</td>
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
