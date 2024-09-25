import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import QRCode from 'qrcode';  // Importamos la librería qrcode
import './App.css'; // Estilos CSS

function App() {
  const [qrValue, setQrValue] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  // Función para generar el QR
  const handleGenerate = () => {
    const inputText = document.getElementById("QR").value;
    if (inputText) {
      setQrValue(inputText);  // Generamos el QR a partir del texto del input
      setIsGenerated(true);   // Muestra el botón de descargar
    } else {
      alert("Por favor, ingresa algún texto");
    }
  };

  // Función para descargar el QR en alta calidad (1024px)
  const handleDownload = async () => {
    try {
      // Generamos un QR de 1024px usando la librería qrcode
      const qrUrl = await QRCode.toDataURL(qrValue, { width: 1024 });

      // Creamos un enlace de descarga
      const downloadLink = document.createElement("a");
      downloadLink.href = qrUrl;
      downloadLink.download = "qr-code-high-quality.png";
      
      // Simulamos el clic en el enlace para iniciar la descarga
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    } catch (error) {
      console.error("Error generando el QR para descargar:", error);
    }
  };

  return (
    <div className="center-container">
      <div className="titu">
        <div className="titulo">Generador de QR</div>
      </div>
      <div className="square">
        <div className="image-container">
          {qrValue ? (
            // Mostrar el QR de 256px en la interfaz
            <QRCodeCanvas id="qrCodeEl" value={qrValue} size={256} />
          ) : (
            <div className="dashed-box">Aquí va el código QR</div>
          )}
        </div>
        
        <input 
          type="text"
          id="QR"
          name="qr"
          required
          size="40"
          placeholder="Ingresa texto para el QR"
        />

        <div className="button-container">
          <button onClick={handleGenerate}>Generar</button>
          {isGenerated && <button onClick={handleDownload}>Descargar</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
