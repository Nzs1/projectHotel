import mainPage from '../../POM/mainPage.js';
import formData from '../../fixtures/formData.json';



describe('Verification the Message Form on Main Page', () => {
    beforeEach(() => {
        cy.visit('/');
    });
   
    it('1 positive test: Should successfully fill the form and submit', () => {
        mainPage.fillMessageForm(formData.dataSet1)
                .submitMessageForm()
                .verifySuccessMessage(formData.dataSet1);
    });

    it('2 positive test: Should successfully submit the form with valid data containing special characters', () => {
        mainPage.fillMessageForm(formData.dataSet2)
                .submitMessageForm()
                .verifySuccessMessage(formData.dataSet2);
    });

    it('3 negative test: Should display error messages for incomplete form submission', () => {
        mainPage.submitMessageForm()
                .verifyErrorMessage(formData.errorMessages);
    });

});
