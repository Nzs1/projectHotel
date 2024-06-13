import adminData from '../fixtures/adminData.json';
import formData from '../fixtures/formData.json';


describe('Admin Dashboard', () => {
  beforeEach(() => {
    
    cy.login();
    cy.contains('a.nav-link', 'Logout').should('be.visible')

  });

  it('Create a new room and verify its presence on the main page', () => {

    // Fill in the form to create a new room
    cy.get('[data-testid="roomName"]').type(adminData.createRoomData.roomNumber);
    cy.get('[data-testid="roomName"]').should('have.value', adminData.createRoomData.roomNumber);
    cy.get('#type').select(adminData.createRoomData.type);
    cy.get('#type').should('have.value', adminData.createRoomData.type);
    cy.get('#accessible').select('true');
    cy.get('#accessible').should('have.value', 'true');
    cy.get('#roomPrice').type(adminData.createRoomData.roomPrice)
    cy.get('#roomPrice').should('have.value', adminData.createRoomData.roomPrice);

    adminData.checkboxFeatures.forEach(feature => {
      cy.get(`#${feature}`).check();
      cy.get(`#${feature}`).should('be.checked');
    });

    cy.get('#createRoom').click();

    cy.contains('.col-sm-1', adminData.createRoomData.roomNumber).should('be.visible');

    // Navigate back to the main page 
    cy.get('#frontPageLink').click()
    cy.url().should('eq', Cypress.config('baseUrl'));

    cy.get('.hotel-room-info h3').eq(1).should('have.text', adminData.createRoomData.type).should('be.visible');
    cy.get('.hotel-room-info ul').eq(1).should('contain', 'WiFi').should('be.visible');
    cy.get('.hotel-room-info ul').eq(1).should('contain', 'TV').should('be.visible');
    cy.get('.hotel-room-info ul').eq(1).should('contain', 'Radio').should('be.visible');
    cy.get('.hotel-room-info ul').eq(1).should('contain', 'Refreshments').should('be.visible');
    cy.get('.hotel-room-info ul').eq(1).should('contain', 'Safe').should('be.visible');
    cy.get('.hotel-room-info ul').eq(1).should('contain', 'Views').should('be.visible')
    cy.get('.hotel-room-info .fa.fa-wheelchair.wheelchair').eq(1).should('be.visible');

  });

  it('Negative Test: Submit empty fields and verify error messages', () => {
    // Submit the form without filling in any fields
    cy.get('#createRoom').click();

    // Verify error messages
    adminData.errorMessages.emptyFields.forEach(errorMessage => {
      cy.contains('.alert-danger', errorMessage).should('be.visible');
    });
  });
});

describe('Message Form and Admin Verification', () => {

  it('Fill the message form on the main page and verify it on the admin page', () => {
    // Fill the form 
    cy.visit('/');
    cy.get('[data-testid=ContactName]').type(formData.dataSet1.name);
    cy.get('[data-testid=ContactEmail]').type(formData.dataSet1.email);
    cy.get('[data-testid=ContactPhone]').type(formData.dataSet1.phone);
    cy.get('[data-testid=ContactSubject]').type(formData.dataSet1.subject);
    cy.get('[data-testid=ContactDescription]').type(formData.dataSet1.message);

    // Submit the form
    cy.get('#submitContact').click();

    // Assert that the form submission was successful
    cy.get('div[style="height: 412px;"] h2').should('have.text', formData.textAssertions.successMessage.replace('{name}', formData.dataSet1.name)).should('be.visible');
    cy.get('div[style="height: 412px;"] p').eq(0).should('have.text', formData.textAssertions.infoMessage).should('be.visible');
    cy.get('div[style="height: 412px;"] p').eq(1).should('have.text', formData.dataSet1.subject).should('be.visible');
    cy.get('div[style="height: 412px;"] p').eq(2).should('have.text', formData.textAssertions.asapMessage).should('be.visible');


    // Verify the submission on the admin page
    cy.login(); 
    cy.get('.fa-inbox').click()
    cy.get('#message1').click()

    // Assert that the new message appears in the admin dashboard
    cy.contains('[data-testid="message"]', formData.dataSet1.name).should('be.visible');
    cy.contains('[data-testid="message"]', formData.dataSet1.email).should('be.visible');
    cy.contains('[data-testid="message"]', formData.dataSet1.phone).should('be.visible');
    cy.contains('[data-testid="message"]', formData.dataSet1.subject).should('be.visible');
    cy.get('[data-testid="message"] .col-12 > p').eq(2).should('have.text', formData.dataSet1.message).and('be.visible')

  });
});

describe('Update hotel room on admin page', () => {

  it('Update the room and verify it on the main page', () => {

    cy.login()
    cy.get('[data-testid="roomlisting"] #roomName101').click()
    cy.get('button.btn.btn-outline-primary.float-right').contains('Edit').click();
    cy.get('#description').clear().type(adminData.updateRoomData.description)
    cy.get('#type').select(adminData.updateRoomData.type);
    cy.get('#type').should('have.value', adminData.updateRoomData.type);
    cy.get('#update').click()

    cy.get('#frontPageLink').click()
    cy.url().should('eq', Cypress.config('baseUrl'));

    cy.get('.hotel-room-info h3').eq(0).should('have.text', adminData.updateRoomData.type).should('be.visible');
    cy.get('.hotel-room-info p').eq(0).should('have.text', adminData.updateRoomData.description).should('be.visible');

  });
});


