import React, { useState } from 'react';
import QrReader from 'react-qr-scanner';

const QRScanner = ({ onScan }) => {
  const [scannedData, setScannedData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleScan = (data) => {
    if (data) {
      setScannedData(data.text); // Extracting the text property from the data object
      onScan(data.text)
    }
  };
  const handleError = (error) => {
    console.error('Error scanning QR code:', error);
    setErrorMessage(error.message);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      {errorMessage && <p>Error: {errorMessage}</p>}
      {scannedData && <p>Scanned Data: {scannedData}</p>}
    </div>
  );
};

export default QRScanner;
