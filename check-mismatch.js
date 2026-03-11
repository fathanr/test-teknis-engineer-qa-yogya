const XLSX = require('xlsx');
const http = require('http');

// Read Excel data
const wb = XLSX.readFile('SOAL 1 Data Compare API Testing.xlsx');
const ws = wb.Sheets[wb.SheetNames[0]];
const excelData = XLSX.utils.sheet_to_json(ws);

// Fetch API data
const options = {
  hostname: 'dummy.restapiexample.com',
  port: 80,
  path: '/api/v1/employees',
  method: 'GET'
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const apiResponse = JSON.parse(data);
    const apiEmployees = apiResponse.data;

    console.log('\n=== DATA COMPARISON SUMMARY ===');
    console.log(`Total employees in Excel: ${excelData.length}`);
    console.log(`Total employees in API: ${apiEmployees.length}`);
    console.log('=============================\n');

    const mismatches = [];

    excelData.forEach((excelEmployee) => {
      const apiEmployee = apiEmployees.find(
        (emp) => String(emp.id) === String(excelEmployee.id)
      );

      if (!apiEmployee) {
        mismatches.push({
          id: excelEmployee.id,
          field: 'NOT_FOUND',
          excelValue: 'Employee exists',
          apiValue: 'Employee not found'
        });
        return;
      }

      // Check name
      if (apiEmployee.employee_name !== excelEmployee.employee_name) {
        mismatches.push({
          id: excelEmployee.id,
          field: 'employee_name',
          excelValue: excelEmployee.employee_name,
          apiValue: apiEmployee.employee_name
        });
      }

      // Check salary
      if (String(apiEmployee.employee_salary) !== String(excelEmployee.employee_salary)) {
        mismatches.push({
          id: excelEmployee.id,
          field: 'employee_salary',
          excelValue: excelEmployee.employee_salary,
          apiValue: apiEmployee.employee_salary
        });
      }

      // Check age
      if (String(apiEmployee.employee_age) !== String(excelEmployee.employee_age)) {
        mismatches.push({
          id: excelEmployee.id,
          field: 'employee_age',
          excelValue: excelEmployee.employee_age,
          apiValue: apiEmployee.employee_age
        });
      }
    });

    console.log(`Total matches: ${excelData.length - mismatches.length}`);
    console.log(`Total mismatches: ${mismatches.length}\n`);

    if (mismatches.length > 0) {
      console.log('=== MISMATCH DETAILS ===');
      mismatches.forEach((mismatch, idx) => {
        console.log(`Mismatch #${idx + 1}:`);
        console.log(`  Employee ID: ${mismatch.id}`);
        console.log(`  Field: ${mismatch.field}`);
        console.log(`  Excel Value: ${mismatch.excelValue}`);
        console.log(`  API Value: ${mismatch.apiValue}`);
        console.log('');
      });
      console.log('========================\n');
    } else {
      console.log('✅ All employee data matches perfectly!\n');
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.end();
