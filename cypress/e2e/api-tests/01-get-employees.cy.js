// cypress/e2e/api-tests/01-get-employees.cy.js
describe('SOAL 01 - GET EMPLOYEE API Testing', () => {
  const API_URL = 'http://dummy.restapiexample.com/api/v1/employees';
  const EXCEL_FILE = 'SOAL 1 Data Compare API Testing.xlsx';

  let excelData = [];
  let apiResponse = null;

  before(() => {
    // Read Excel data control
    cy.task('readExcel', EXCEL_FILE).then((data) => {
      excelData = data;
      cy.log('Excel data loaded:', JSON.stringify(data, null, 2));
    });

    // Make API request ONLY ONCE to avoid rate limiting
    cy.request({
      method: 'GET',
      url: API_URL,
      failOnStatusCode: false
    }).then((response) => {
      // Handle rate limiting
      if (response.status === 429) {
        cy.log('Rate limit reached, waiting 60 seconds...');
        cy.wait(60000); // Wait 1 minute

        // Retry after waiting
        cy.request({
          method: 'GET',
          url: API_URL
        }).then((retryResponse) => {
          apiResponse = retryResponse;
        });
      } else {
        apiResponse = response;
      }
    });
  });

  it('TC01 - Should return status 200', () => {
    expect(apiResponse.status).to.equal(200);
  });

  it('TC02 - Should have correct response structure', () => {
    expect(apiResponse.body).to.have.property('status');
    expect(apiResponse.body).to.have.property('data');
    expect(apiResponse.body.status).to.equal('success');
  });

  it('TC03 - Should return array of employees', () => {
    expect(apiResponse.body.data).to.be.an('array');
    expect(apiResponse.body.data).to.not.be.empty;
  });

  it('TC04 - Each employee should have required fields', () => {
    apiResponse.body.data.forEach((employee) => {
      expect(employee).to.have.all.keys(
        'id',
        'employee_name',
        'employee_salary',
        'employee_age',
        'profile_image'
      );
    });
  });

  it('TC05 - Employee data should match Excel control data', function() {
    const apiEmployees = apiResponse.body.data;
    const mismatches = [];

    // Verify number of records match
    expect(apiEmployees.length).to.be.gte(excelData.length);

    // Compare each employee from Excel with API response
    excelData.forEach((excelEmployee) => {
      // Find matching employee by ID
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

    // Build detailed mismatch report for Mochawesome
    let mismatchDetails = '\n=== DATA COMPARISON SUMMARY ===\n';
    mismatchDetails += `Total employees in Excel: ${excelData.length}\n`;
    mismatchDetails += `Total employees compared: ${excelData.length}\n`;
    mismatchDetails += `Total matches: ${excelData.length - mismatches.length}\n`;
    mismatchDetails += `Total mismatches: ${mismatches.length}\n`;

    if (mismatches.length > 0) {
      mismatchDetails += '\n=== MISMATCH DETAILS ===\n';
      mismatches.forEach((mismatch, idx) => {
        mismatchDetails += `Mismatch #${idx + 1}:\n`;
        mismatchDetails += `  Employee ID: ${mismatch.id}\n`;
        mismatchDetails += `  Field: ${mismatch.field}\n`;
        mismatchDetails += `  Excel Value: ${mismatch.excelValue}\n`;
        mismatchDetails += `  API Value: ${mismatch.apiValue}\n\n`;
      });
      mismatchDetails += '========================\n';
    } else {
      mismatchDetails += '✅ All employee data matches perfectly!\n';
    }

    // Log to console
    cy.task('log', mismatchDetails);

    // Add to test context for Mochawesome report
    if (mismatches.length > 0) {
      // Add detailed error message
      const errorMessage = `Found ${mismatches.length} data mismatch(es) between Excel and API:\n\n` +
        mismatches.map((m, i) => `
          Mismatch #${i + 1}:
          - Employee ID: ${m.id}
          - Field: ${m.field}
          - Excel Value: "${m.excelValue}"
          - API Value: "${m.apiValue}"
        `).join('\n');

      // This will appear in Mochawesome report
      throw new Error(errorMessage);
    }

    // Pass if no mismatches
    expect(mismatches.length).to.equal(0);
  });

  it('TC06 - Response time should be less than 2 seconds', () => {
    expect(apiResponse.duration).to.be.lessThan(2000);
  });

  it('TC07 - Response headers should contain content-type', () => {
    expect(apiResponse.headers).to.have.property('content-type');
  });

  after(() => {
    // Generate summary report
    cy.task('log', '=== GET EMPLOYEES API TEST SUMMARY ===');
    cy.task('log', `Total employees in Excel: ${excelData.length}`);
    cy.task('log', `Total employees in API response: ${apiResponse.body.data.length}`);
    cy.task('log', `Status: ${apiResponse.status}`);
    cy.task('log', `Response time: ${apiResponse.duration}ms`);
    cy.task('log', '=======================================');
  });
});
