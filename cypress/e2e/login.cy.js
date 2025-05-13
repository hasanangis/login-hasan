const errorMessages = {
    email: 'Email is required',
    password: 'Password is required',
    terms: 'You must accept the terms and conditions',
};
describe('Login page', () => {

  describe("Unsuccessfull login scenario tests", ()=> {

    it("it shows error message when email is not valid", () => {
      cy.visit("http://localhost:5175/");
      cy.get("[data-cy='email-input']").type("hasanangis@r");
      cy.get("[data-cy='error-message']").should("have.length", 1);

      cy.contains(errorMessages.email);

      cy.get("[data-cy='submit-button']").should("be.disabled");

    });

    it("it shows error messages when email and password are not valid", () => {
      cy.visit("http://localhost:5175/");
      cy.get("[data-cy='email-input']").type("hasanangis@r");
      cy.get("[data-cy='password-input']").type("5Kon");

      cy.get("[data-cy='error-message']").should("have.length", 2);

      cy.contains(errorMessages.email);
      cy.contains(errorMessages.password);

      cy.get("[data-cy='submit-button']").should("be.disabled");

    });

    it("button is disabled when email and password are valid but terms are not accepted", () => {
       cy.visit("http://localhost:5175/");
        cy.get("[data-cy='email-input']").type("hasanangis@gmail.com");
        cy.get("[data-cy='password-input']").type("$$%%5Kon");
        cy.get("[data-cy='submit-button']").should("be.disabled");
    });
  });


  describe("successfull login scenario tests", () => {
    it("logins successfully when valid email, password and acception of the terms checked, and redirect to success page", () => {
        cy.visit("http://localhost:5175/");
        cy.get("[data-cy='email-input']").type("hasanangis@gmail.com");
        cy.get("[data-cy='password-input']").type("$$%%5Kon");
        cy.get("[data-cy='terms-input']").check();


        cy.get("[data-cy='submit-button']").click();


        cy.url().should("include", "/success");
    });
  });
})