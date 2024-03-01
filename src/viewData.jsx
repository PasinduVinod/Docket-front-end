import React, { useState, useEffect } from 'react';
import Scanner from './scanner';
import axios from 'axios';


const ViewData = () => {
    const [data, setData] = useState([]);
    const [selectedHU, setSelectedHU] = useState(null);
    const [isScannerOpen, setIsScannerOpen] = useState(false);
    const [scannedData, setScannedData] = useState(null);
    const [ismatching, setIsmatching] = useState(false);
    const [qty, setQty] = useState();

    const [poData, setPoData] = useState([{"PO": '001', "QTY":'500'},{"PO": '002', "QTY":'900'}])

  useEffect(() => {
    // const storedData = localStorage.getItem('excelData');
    // if (storedData) {
    //   setData(JSON.parse(storedData));
    // }
    // Define a function to fetch data from the API
    const fetchDataFromAPI = () => {
        return new Promise((resolve, reject) => {
        // Make a GET request to the API endpoint
        axios.get('http://localhost:5000/api/hu/gethus')
            .then(response => {
            // Extract the data from the response
            const data = response.data;
            
            // Optionally, store the fetched data in local storage
            // localStorage.setItem('excelData', JSON.stringify(data));
            setData(data)
            
            // Resolve the promise with the fetched data
            resolve(data);
            })
            .catch(error => {
            // Reject the promise with the error
            reject(error);
            });
        });
    };

    fetchDataFromAPI()
  }, []);

  const handleScanHU = (huNumber, remain ) => {
    console.log(remain)
    setSelectedHU(huNumber);
    setQty(0);

    setIsScannerOpen(true);
  };



  const handleScan = (datas) => {
    // Handle the scanned data received from the QRScanner component
    setScannedData(datas);
    setIsScannerOpen(false)
    compare(datas)
  };

  const compare = (qr) => {
    if(qr == selectedHU){
        setIsmatching(true)
        updateHU()
    }else{
        setIsmatching(false)
    }
  }

  const updateHU = async () => {
    try {
            const data = {
                HU : selectedHU,
                Remain : qty,
                Status : true
            }
            const response = await axios.post('http://localhost:5000/api/hu/updatehu', data);
            console.log('Data posted successfully:', response.data);
         } catch (error) {
            console.error('Error posting data:', error);
         }
  }

//   if matched, reduce from the hu and pro

  return (
    <div>
        {isScannerOpen && <Scanner onScan={handleScan}/>}
        <div>{ismatching == true ? (<h1 style={{color:"green"}}>{scannedData}</h1>):(<h1 style={{color:"red"}}>{scannedData}</h1>)}</div>
      {data.length > 0 && (
        <table className="border" style={{ border: 'solid 1px black' }}>
          <thead>
            <tr style={{ border: 'solid 1px black' }}>
                <th>
                    HU Number
                </th>
                <th>
                    Quantity
                </th>
                <th>
                    Status
                </th>
                <th>
                    Action
                </th>
              
            </tr>
          </thead>
          <tbody>
              {data.map((item, index) => (
                <tr key={index} style={{ border: 'solid 1px black' }}>
                  <td>{item.HU}</td>
                  <td>{item.Qty}</td>
                  <td>{item.scanned == true ? (<span style={{color:'black'}}>Issued</span>) : (<span style={{color:'green'}}>Not Issued</span>)}</td>
                  <td>
                    <button onClick={() => handleScanHU(item.HU, item.Qty)}>
                      Scan
                    </button>
                  </td>
                  
                </tr>
              ))}
            </tbody>
        </table>
      )}
      {data.length === 0 && <p>No data found in local storage.</p>}
    </div>
  );
};

export default ViewData;
