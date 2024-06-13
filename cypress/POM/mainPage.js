import formData from '../fixtures/formData.json';

class MainPage {
    getMessageFormNameInput = () => cy.get('[data-testid=ContactName]');
    getMessageFormEmailInput = () => cy.get('[data-testid=ContactEmail]');
    getMessageFormPhoneInput = () => cy.get('[data-testid=ContactPhone]');
    getMessageFormSubjectInput = () => cy.get('[data-testid=ContactSubject]');
    getMessageFormDescriptionInput = () => cy.get('[data-testid=ContactDescription]');
    getSubmitContactButton = () => cy.get('#submitContact');
    getSuccessMessageHeader = () => cy.get('div[style="height: 412px;"] h2');
    getSuccessMessageInfo = () => cy.get('div[style="height: 412px;"] p').eq(0);
    getSuccessMessageSubject = () => cy.get('div[style="height: 412px;"] p').eq(1);
    getSuccessMessageASAP = () => cy.get('div[style="height: 412px;"] p').eq(2);
    getErrorMessageContainer = () => cy.get('.alert-danger');

    fillMessageForm(data) {
        this.getMessageFormNameInput().type(data.name);
        this.getMessageFormEmailInput().type(data.email);
        this.getMessageFormPhoneInput().type(data.phone);
        this.getMessageFormSubjectInput().type(data.subject);
        this.getMessageFormDescriptionInput().type(data.message);
        return this;
    }

    submitMessageForm() {
        this.getSubmitContactButton().click();
        return this;
    }

    verifySuccessMessage(data) {
        this.getSuccessMessageHeader().should('have.text', formData.textAssertions.successMessage.replace('{name}', data.name)).and('be.visible');
        this.getSuccessMessageInfo().should('have.text', formData.textAssertions.infoMessage).and('be.visible');
        this.getSuccessMessageSubject().should('have.text', data.subject).and('be.visible');
        this.getSuccessMessageASAP().should('have.text', formData.textAssertions.asapMessage).and('be.visible');
        return this;
    }

    verifyErrorMessage(errors) {
        this.getErrorMessageContainer().should('be.visible').within(() => {
            cy.contains(errors.blankEmail).should('exist');
            cy.contains(errors.shortSubject).should('exist');
            cy.contains(errors.blankMessage).should('exist');
            cy.contains(errors.blankSubject).should('exist');
            cy.contains(errors.blankName).should('exist');
            cy.contains(errors.shortMessage).should('exist');
            cy.contains(errors.shortPhone).should('exist');
            cy.contains(errors.blankPhone).should('exist');
        });
        return this;
    }

}

export default new MainPage();
