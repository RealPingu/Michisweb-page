// components/pdf/RecetaPDF.tsx
import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

// Estilos tipo React Native
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginVertical: 10,
  },
  heading: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },
  table: {
    display: "flex",
    flexDirection: "row",
    borderWidth: 1,
    marginBottom: 10,
  },
  cell: {
    flex: 1,
    borderWidth: 1,
    padding: 4,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
  },
  line: {
    marginBottom: 4,
  },
  recetaBody: {
    marginTop: 20,
    paddingLeft: 20,
  },
  firma: {
    marginTop: 30,
    textAlign: "right",
    fontWeight: "medium",
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 8,
    color: "#999",
  },
});

interface Props {
  nombrePaciente: string;
  edad: string;
  direccion: string;
  ciudad: string;
  ci: string;
}

const RecetaPDF: React.FC<Props> = ({
  nombrePaciente,
  edad,
  direccion,
  ciudad,
  ci,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>RECETA</Text>

      <View style={styles.section}>
        <Text style={styles.heading}>DATOS DEL PROFESIONAL</Text>

        {/* Tabla de Fecha */}
        <View style={styles.table}>
          <Text style={styles.cell}>DÍA</Text>
          <Text style={styles.cell}>MES</Text>
          <Text style={styles.cell}>AÑO</Text>
        </View>
        <View style={styles.table}>
          <Text style={styles.cell}> </Text>
          <Text style={styles.cell}> </Text>
          <Text style={styles.cell}> </Text>
        </View>

        {/* Datos del paciente */}
        <View style={{ marginTop: 10 }}>
          <Text style={styles.line}>Nombre Paciente: {nombrePaciente}</Text>
          <Text style={styles.line}>Edad: {edad}</Text>
          <Text style={styles.line}>Dirección: {direccion}</Text>
          <Text style={styles.line}>Ciudad: {ciudad}</Text>
          <Text style={styles.line}>CI: {ci}</Text>
        </View>
      </View>

      {/* Cuerpo de la receta */}
      <View style={styles.section}>
        <Text style={{ fontWeight: "bold" }}>Rp:</Text>
        <View style={styles.recetaBody}>
          <Text><Text style={{ fontStyle: "italic" }}>Marca comercial</Text></Text>
          <Text style={{ fontWeight: "bold" }}>NOMBRE GENÉRICO</Text>
          <Text>Tabletas de 500 mg.</Text>
          <Text style={{ fontWeight: "bold" }}>
            Tomar 1 tableta cada 12 horas durante 14 días.
          </Text>
          <Text style={{ fontWeight: "bold" }}>TOTAL 28 UNIDADES</Text>
        </View>
      </View>

      {/* Firma */}
      <Text style={styles.firma}>FIRMA MÉDICO</Text>

      {/* Footer */}
      <Text style={styles.footer}>
        IMPRENTA • RUT • DIRECCIÓN • TELÉFONO
      </Text>
    </Page>
  </Document>
);

export default RecetaPDF;
