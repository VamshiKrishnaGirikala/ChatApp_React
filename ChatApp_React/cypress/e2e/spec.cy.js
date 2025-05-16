// describe('Chat App E2E Tests', () => {
//   beforeEach(() => {
//     // Visit the login page before each test
//     cy.visit('http://localhost:3000/login');
//   });

//   it('should load the login page successfully', () => {
//     cy.contains('Welcome Back').should('be.visible');
//     cy.viewport(1280, 720);
//     cy.contains('Welcome back!').should('be.visible');
//     cy.contains('Sign in to continue your conversations and catch up with your messages.').should('be.visible');
//   });

//   it('should display a responsive layout', () => {
//     cy.viewport('iphone-6'); // Simulate mobile view
//     cy.get('.h-screen').should('be.visible'); // Check layout for mobile
//     cy.viewport('macbook-15'); // Simulate desktop view
//     cy.get('.lg\\:grid-cols-2').should('be.visible'); // Check layout for desktop
//   });

//   it('should navigate to the signup page', () => {
//     cy.contains('Create account').click();
//     cy.url().should('include', '/signup');
//   });

//   it('should validate the email input field', () => {
//     cy.get('label').contains('Email').should('exist');
//     cy.get('input[type="email"]').should('exist');
//     cy.get('input[type="email"]').type('john.ham@gmail.com').should('have.value', 'john.ham@gmail.com');
//   });

//   it('should validate the password input field', () => {
//     cy.get('label').contains('Password').should('exist');
//     cy.get('input[type="password"]').should('exist');
//     cy.get('input[type="password"]').type('Password@1').should('have.value', 'Password@1');
//   });

//   it('should toggle password visibility', () => {
//     cy.get('input[type="password"]').should('exist');
//     cy.get('button').contains('Eye').click(); // Assuming the button contains an icon or text for toggling
//     cy.get('input[type="text"]').should('exist');
//     cy.get('button').contains('EyeOff').click();
//     cy.get('input[type="password"]').should('exist');
//   });

//   it('should not submit the form with empty fields', () => {
//     cy.get('button[type="submit"]').click();
//     cy.contains('Email is required').should('be.visible'); // Assuming validation messages exist
//     cy.contains('Password is required').should('be.visible');
//   });

//   it('should display an error message for invalid credentials', () => {
//     cy.get('input[type="email"]').type('invalid.email@gmail.com');
//     cy.get('input[type="password"]').type('WrongPassword');
//     cy.get('button[type="submit"]').click();
//     cy.contains('Invalid email or password').should('be.visible'); // Assuming this is the error message
//   });

//   it('should submit the form with valid data and redirect to the home page', () => {
//     cy.get('input[type="email"]').type('john.ham@gmail.com');
//     cy.get('input[type="password"]').type('Password@1');
//     cy.get('button[type="submit"]').click();
//     cy.url().should('eq', 'http://localhost:3000/'); // Verify redirection
//   });

//   it('should disable the submit button while logging in', () => {
//     cy.get('input[type="email"]').type('john.ham@gmail.com');
//     cy.get('input[type="password"]').type('Password@1');
//     cy.get('button[type="submit"]').should('not.be.disabled').click();
//     cy.get('button[type="submit"]').should('be.disabled'); // Assuming `isLoggingIn` disables the button
//   });

//   it('should display a loader while logging in', () => {
//     cy.get('input[type="email"]').type('john.ham@gmail.com');
//     cy.get('input[type="password"]').type('Password@1');
//     cy.get('button[type="submit"]').click();
//     cy.get('.animate-spin').should('be.visible'); // Assuming the loader has the `animate-spin` class
//   });
// });
import '../support/commands';

describe('Chat App E2E Tests', () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit('http://localhost:3000/login');
  });

  // Login Page Tests
  describe('Login Page', () => {
    it('should load the login page successfully', () => {
        cy.contains('Welcome Back').should('be.visible');
        cy.viewport(1280, 720);
        cy.contains('Welcome back!').should('be.visible');
        cy.contains('Sign in to continue your conversations and catch up with your messages.').should('be.visible');
      });

    it('should display a responsive layout', () => {
      cy.viewport('iphone-6'); // Mobile view
      cy.get('.h-screen').should('be.visible');
      cy.viewport('macbook-15'); // Desktop view
      cy.get('.lg\\:grid-cols-2').should('be.visible');
    });

    it('should validate the email input field', () => {
      cy.get('label').contains('Email').should('exist');
      cy.get('input[type="email"]').should('exist').type('john.ham@gmail.com').should('have.value', 'john.ham@gmail.com');
    });

    it('should validate the password input field', () => {
      cy.get('label').contains('Password').should('exist');
      cy.get('input[type="password"]').should('exist').type('Password@1').should('have.value', 'Password@1');
    });

    it('should toggle password visibility', () => {
      cy.get('input[type="password"]').should('exist');
      cy.get('button').find('svg.lucide-eye').click();
      cy.get('input[type="text"]').should('exist');
      cy.get('button').find('svg.lucide-eye-off').click();
      cy.get('input[type="password"]').should('exist');
    });

    it('should not submit the form with empty fields and display a toast message', () => {
      cy.get('button[type="submit"]').click();
      cy.contains('Please fill all the fields').should('be.visible');
    });

    it('should display an error message for invalid credentials', () => {
      cy.get('input[type="email"]').type('invalid.email@gmail.com');
      cy.get('input[type="password"]').type('WrongPassword');
      cy.get('button[type="submit"]').click();
      cy.contains('invalid credentials').should('be.visible');
    });

    it('should submit the form with valid data and redirect to the home page', () => {
      cy.get('input[type="email"]').type('john.ham@gmail.com');
      cy.get('input[type="password"]').type('Password@1');
      cy.get('button[type="submit"]').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });

    it('should disable the submit button while logging in', () => {
      cy.get('input[type="email"]').type('john.ham@gmail.com');
      cy.get('input[type="password"]').type('Password@1');
      cy.get('button[type="submit"]').should('not.be.disabled').click();
      cy.get('button[type="submit"]').should('be.disabled');
    });

    it('should display a loader while logging in', () => {
      cy.get('input[type="email"]').type('john.ham@gmail.com');
      cy.get('input[type="password"]').type('Password@1');
      cy.get('button[type="submit"]').click();
      cy.get('.animate-spin').should('be.visible');
    });
  });

  // Signup Page Tests
  describe('Signup Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/signup');
    });

    it('should load the signup page successfully', () => {
      cy.contains('Create Account').should('be.visible');
    });

    it('should validate the signup form fields', () => {
      cy.get('input[name="fullName"]').type('John Doe').should('have.value', 'John Doe');
      cy.get('input[type="email"]').type('john.doe@gmail.com').should('have.value', 'john.doe@gmail.com');
      cy.get('input[type="password"]').type('Password@1').should('have.value', 'Password@1');
    });

    it('should submit the signup form and redirect to the home page', () => {
      const randomFullName = `User${Math.floor(Math.random() * 10000)}`;
      const randomEmail = `user${Math.floor(Math.random() * 10000)}@example.com`;

      cy.get('input[name="fullName"]').type(randomFullName);
      cy.get('input[type="email"]').type(randomEmail);
      cy.get('input[type="password"]').type('Password@1');
      cy.get('button[type="submit"]').click();
      cy.url().should('eq', 'http://localhost:3000/');
    });
  });

  // Home Page Tests
  describe('Home Page', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/login');
    });
    it('should load the home page after login', () => {
      cy.login('john.ham@gmail.com', 'Password@1');
      cy.visit('http://localhost:3000/');
      cy.contains('Welcome to Chatty!').should('be.visible');
    });

    it('should log out and redirect to the login page', () => {
      cy.login('john.ham@gmail.com', 'Password@1');
      cy.get('button').contains('Logout').click();
      cy.url().should('include', '/login');
    });
  });

  // // Error Handling Tests
  // describe('Error Handling', () => {
  //   it('should display a 404 page for undefined routes', () => {
  //     cy.visit('http://localhost:3000/non-existent-route', { failOnStatusCode: false });
  //     cy.contains('404 - Page Not Found').should('be.visible');
  //   });
  // });

  // General Tests
  describe('General Functionality', () => {
    it('should navigate using the navigation bar', () => {
      cy.login('john.ham@gmail.com', 'Password@1');
      cy.get('header').contains('Profile').click();
      cy.url().should('include', '/profile');
    });

    it('should display a responsive navigation bar', () => {
      cy.viewport('iphone-6');
      cy.get('header').should('be.visible');
      cy.viewport('macbook-15');
      cy.get('header').should('be.visible');
    });
  });
});

