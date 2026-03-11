// cypress/support/commands.js

// Custom command to read Excel file
Cypress.Commands.add('readExcel', (filePath) => {
  return cy.task('readExcel', filePath)
})

// Custom command for API testing
Cypress.Commands.add('apiGet', (url, headers = {}) => {
  return cy.request({
    method: 'GET',
    url: url,
    headers: headers
  })
})

Cypress.Commands.add('apiPost', (url, body, headers = {}) => {
  return cy.request({
    method: 'POST',
    url: url,
    body: body,
    headers: headers
  })
})
