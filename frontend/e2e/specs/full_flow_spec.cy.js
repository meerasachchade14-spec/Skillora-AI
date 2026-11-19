// Full flow end‑to‑end test using Cypress (UI level)
// This spec logs in, uploads a resume, triggers analysis, checks various pages.

describe('Skillora AI Full Flow', () => {
  const user = {
    name: 'Cypress Tester',
    email: 'cypress.test@example.com',
    password: 'StrongPass!234',
  };

  before(() => {
    // Ensure a clean state by resetting the test DB via backend endpoint (if available)
    // Alternatively, rely on the integration test suite which uses separate test DB.
  });

  it('Registers a new account', () => {
    cy.visit('/register');
    cy.get('input[name="name"]').type(user.name);
    cy.get('input[name="email"]').type(user.email);
    cy.get('input[name="password"]').type(user.password);
    cy.get('input[name="confirm_password"]').type(user.password);
    cy.contains('Register').click();
    // Wait for OTP page
    cy.url().should('include', '/verify-otp');
    // Retrieve OTP from DB via a test helper endpoint (needs to exist); for now assume manual entry.
    // In CI we can call a backend route to fetch OTP.
    cy.request({
      method: 'GET',
      url: `http://127.0.0.1:8000/api/testing/get-otp?email=${user.email}&type=registration`,
    }).then((resp) => {
      expect(resp.status).to.eq(200);
      const otp = resp.body.otp_code;
      cy.get('input[name="otp_code"]').type(otp);
      cy.contains('Verify OTP').click();
    });
    // Should be logged in and redirected to dashboard
    cy.url().should('include', '/dashboard');
  });

  it('Uploads a resume and runs analysis', () => {
    cy.visit('/resume-upload');
    cy.get('input[type="file"]').attachFile('test.docx'); // requires cypress-file-upload plugin
    cy.contains('Upload').click();
    // Wait for upload success toast
    cy.contains('Resume uploaded').should('be.visible');
    // Navigate to analysis page
    cy.visit('/resume-analysis');
    cy.contains('Run Analysis').click();
    // Wait for analysis to complete (polling status)
    cy.contains('Analysis completed', { timeout: 60000 }).should('be.visible');
  });

  it('Checks job recommendations and roadmap', () => {
    cy.visit('/job-recommendations');
    cy.get('.job-card').should('have.length.greaterThan', 0);
    cy.visit('/learning-roadmap');
    cy.get('.roadmap-step').should('exist');
  });

  it('Logs out', () => {
    cy.get('button[aria-label="Logout"]').click();
    cy.url().should('include', '/login');
  });
});
