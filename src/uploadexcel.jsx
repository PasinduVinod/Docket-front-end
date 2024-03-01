import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const ExcelReader = () => {
  const [excelData, setExcelData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workbook = XLSX.read(binaryString, { type: 'binary' });

      // Assuming the first sheet contains the data
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convert the worksheet to JSON format
      const data = XLSX.utils.sheet_to_json(worksheet);
      // localStorage.setItem('excelData', JSON.stringify(data));

      console.log(data)

      // Set the Excel data to state
      setExcelData(data);
      saveData(data);
    };

    reader.readAsBinaryString(file);
  };

  const saveData = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/hu/createhus', data);
      console.log('Data posted successfully:', response.data);
    } catch (error) {
      console.error('Error posting data:', error);
    }
  };
  

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {/* {excelData && (
        <table className='border' style={{border:"solid 1px black"}}>
          <thead>
            <tr style={{border:"solid 1px black"}}>
              {Object.keys(excelData[0]).map((key) => (
                <th  style={{border:"solid 1px black"}} className='' key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.map((row, rowIndex) => (
              <tr  style={{border:"solid 1px black"}} key={rowIndex}>
                {Object.values(row).map((value, columnIndex) => (
                  <td  style={{border:"solid 1px black", padding: '5px'}} key={columnIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
    </div>
  );
}

export default ExcelReader;
