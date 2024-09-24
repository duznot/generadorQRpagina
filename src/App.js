import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import './App.css'; // Estilos CSS

function App() {
  const [qrValue, setQrValue] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const handleGenerate = () => {
    const inputText = document.getElementById("QR").value;
    if (inputText) {
      setQrValue(inputText);  // Generamos el QR a partir del texto del input
      setIsGenerated(true);   // Muestra el botón de descargar
    } else {
      alert("Por favor, ingresa algún texto");
    }
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qrCodeEl");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="center-container">
      <div className="square">
        <div className="image-container">
          {qrValue ? (
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
