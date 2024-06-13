/// <reference types = 'cypress' />

import formData from '../fixtures/formData.json';


beforeEach(() => {
    cy.visit('/');
});

describe('Verification the Message Form', () => {

    it('1 positive test: Should successfully fill the form and submit', () => {

        // Fill the form 
        cy.get('[data-testid=ContactName]').type(formData.dataSet1.name);
        cy.get('[data-testid=ContactEmail]').type(formData.dataSet1.email);
        cy.get('[data-testid=ContactPhone]').type(formData.dataSet1.phone);
        cy.get('[data-testid=ContactSubject]').type(formData.dataSet1.subject);
        cy.get('[data-testid=ContactDescription]').type(formData.dataSet1.message);

        // Submit the form
        cy.get('#submitContact').click();

        // Assert that the form submission was successful
        cy.get('div[style="height: 412px;"] h2').should('have.text', formData.textAssertions.successMessage.replace('{name}', formData.dataSet1.name))
            .and('be.visible');
        cy.get('div[style="height: 412px;"] p').eq(0).should('have.text', formData.textAssertions.infoMessage).and('be.visible');
        cy.get('div[style="height: 412px;"] p').eq(1).should('have.text', formData.dataSet1.subject).and('be.visible');
        cy.get('div[style="height: 412px;"] p').eq(2).should('have.text', formData.textAssertions.asapMessage).and('be.visible');
    });

    it('2 positive test: Should successfully submit the form with valid data containing special characters', () => {

        // Fill the contact form with valid data containing special characters
        cy.get('[data-testid=ContactName]').type(formData.dataSet2.name);
        cy.get('[data-testid=ContactEmail]').type(formData.dataSet2.email);
        cy.get('[data-testid=ContactPhone]').type(formData.dataSet2.phone);
        cy.get('[data-testid=ContactSubject]').type(formData.dataSet2.subject);
        cy.get('[data-testid=ContactDescription]').type(formData.dataSet2.message);

        // Submit the form
        cy.get('#submitContact').click();

        // Verify that the submission was successful
        cy.get('div[style="height: 412px;"] h2').should('have.text', formData.textAssertions.successMessage.replace('{name}', formData.dataSet2.name))
            .and('be.visible');
        cy.get('div[style="height: 412px;"] p').eq(0).should('have.text', formData.textAssertions.infoMessage).and('be.visible');
        cy.get('div[style="height: 412px;"] p').eq(1).should('have.text', formData.dataSet2.subject).and('be.visible');
        cy.get('div[style="height: 412px;"] p').eq(2).should('have.text', formData.textAssertions.asapMessage).and('be.visible');
    });
});

describe('Negative Form Submission', () => {

    it('1 negative test:Should display error messages for incomplete form submission', () => {
        // Click the submit button without filling in any fields
        cy.get('#submitContact').click();

        // Assert that the error messages are displayed
        cy.get('.alert-danger').should('be.visible').within(() => {
            cy.contains(formData.errorMessages.blankEmail).should('exist');
            cy.contains(formData.errorMessages.shortSubject).should('exist');
            cy.contains(formData.errorMessages.blankMessage).should('exist');
            cy.contains(formData.errorMessages.blankSubject).should('exist');
            cy.contains(formData.errorMessages.blankName).should('exist');
            cy.contains(formData.errorMessages.shortMessage).should('exist');
            cy.contains(formData.errorMessages.shortPhone).should('exist');
            cy.contains(formData.errorMessages.blankPhone).should('exist');
        });
    });

    it('2 negative test: Should display error message for invalid email format', () => {
        // Fill the form with an invalid email format
        cy.get('[data-testid=ContactEmail]').type('invalid-email');

        // Submit the form
        cy.get('#submitContact').click();

        // Assert that the error message for invalid email format is displayed
        cy.get('.alert-danger').should('be.visible').contains(formData.errorMessages.invalidEmail);
    });

    it('3 negative test: Should display error messages for all fields with lower boundary values', () => {
        // Fill the form with lower boundary values for all fields
        cy.get('[data-testid=ContactName]').type('A');
        cy.get('[data-testid=ContactEmail]').type(formData.lowerBoundaryValues.email);
        cy.get('[data-testid=ContactPhone]').type(formData.lowerBoundaryValues.phone);
        cy.get('[data-testid=ContactSubject]').type(formData.lowerBoundaryValues.subject);
        cy.get('[data-testid=ContactDescription]').type(formData.lowerBoundaryValues.message);

        // Submit the form
        cy.get('#submitContact').click();

        // Assert that error messages for all fields are displayed
        cy.get('.alert-danger').should('be.visible').within(() => {
            cy.contains(formData.errorMessages.shortPhone).should('exist');
            cy.contains(formData.errorMessages.shortSubject).should('exist');
            cy.contains(formData.errorMessages.shortMessage).should('exist');
        });
    });

    it('4 negative test: Should display error messages for all fields with upper boundary values', () => {
        // Fill the form with upper boundary values for all fields
        cy.get('[data-testid=ContactName]').type('A'.repeat(101));
        cy.get('[data-testid=ContactEmail]').type('a@'.repeat(26) + 'a.com');
        cy.get('[data-testid=ContactPhone]').type('1'.repeat(22));
        cy.get('[data-testid=ContactSubject]').type('S'.repeat(101));
        cy.get('[data-testid=ContactDescription]').type('M'.repeat(2001));

        // Submit the form
        cy.get('#submitContact').click();

        // Assert that error messages for all fields are displayed
        cy.get('.alert-danger').should('be.visible').within(() => {
            cy.contains(formData.errorMessages.shortPhone).should('exist');
            cy.contains(formData.errorMessages.shortSubject).should('exist');
            cy.contains(formData.errorMessages.shortMessage).should('exist');
        });
    });
});
