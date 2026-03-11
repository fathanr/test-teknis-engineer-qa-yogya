// cypress/plugins/index.js
const fs = require('fs');
const XLSX = require('xlsx');

/**
 * Read Excel file and convert to JSON
 * @param {string} filePath - Path to Excel file
 * @returns {Array} - Array of objects from Excel data
 */
function readExcelFile(filePath) {
  try {
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    // Read workbook
    const workbook = XLSX.readFile(filePath);

    // Get first sheet name
    const sheetName = workbook.SheetNames[0];

    // Convert sheet to JSON
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    return data;
  } catch (error) {
    console.error('Error reading Excel file:', error.message);
    throw error;
  }
}

module.exports = (on, config) => {
  on('task', {
    readExcel(filePath) {
      return readExcelFile(filePath);
    },
    log(message) {
      console.log(message);
      return null;
    }
  });

  return config;
};
