// src/pages/LoginPage.cy.jsx
import { mount } from 'cypress/react';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';
import '../index.css'; // Import global styles

describe('LoginPage Component', () => {
    beforeEach(() => {
        // Set viewport to large screen size (1024x768 is typically considered 'lg' breakpoint)
        cy.viewport(1024, 768);

        // Mount the component before each test
        mount(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
    });

    // 1. Initial Render Tests
    describe('Initial Render', () => {
        it('should render the login page with all elements', () => {
            // Check main container
            cy.get('.h-screen').should('exist');

            // Check logo and headings
            cy.get('svg.lucide-message-square').should('be.visible');
            cy.contains('h1', 'Welcome Back').should('be.visible');
            cy.contains('p', 'Sign in to your account').should('be.visible');

            // Check form elements
            cy.get('input[type="email"]').should('exist');
            cy.get('input[type="password"]').should('exist');
            cy.get('button[type="submit"]').contains('Sign in').should('exist');
        });

        it('should display the AuthImagePattern component on large screens', () => {
            // Check that the container becomes visible at large screen sizes
            cy.get('.hidden.lg\\:flex').should('be.visible');
            cy.contains('Welcome back!').should('be.visible');
            cy.contains('Sign in to continue your conversations and catch up with your messages').should('be.visible');
        });
    });

    // 2. Form Input Tests
    describe('Form Inputs', () => {
        it('should allow email input', () => {
            cy.get('input[type="email"]')
                .type('test@example.com')
                .should('have.value', 'test@example.com');
        });

        it('should allow password input', () => {
            cy.get('input[type="password"]')
                .type('password123')
                .should('have.value', 'password123');
        });

        it('should toggle password visibility', () => {
            // Initially password field should be of type password
            cy.get('input[type="password"]').should('exist');

            // Click eye icon to show password
            cy.get('button').find('svg.lucide-eye').click();
            cy.get('input[type="text"]').should('exist');

            // Click eye-off icon to hide password
            cy.get('button').find('svg.lucide-eye-off').click();
            cy.get('input[type="password"]').should('exist');
        });
    });

    // 3. Form Submission Tests
    describe('Form Submission', () => {
        // it('should show validation message for empty fields', () => {
        //     cy.get('button[type="submit"]').click();
        //     // Since we're using react-hot-toast, we need to check for the toast notification
        //     cy.get('#_rht_toaster').contains('Please fill all the fields').should('be.visible');
        // });

        it('should handle form submission with valid data', () => {
            cy.get('input[type="email"]').type('test@example.com');
            cy.get('input[type="password"]').type('password123');
            cy.get('button[type="submit"]').click();
            // Add assertions based on your form submission behavior
        });

        // it('should disable submit button and show loader while submitting', () => {
        //     cy.get('input[type="email"]').type('test@example.com');
        //     cy.get('input[type="password"]').type('password123');
        //     cy.get('button[type="submit"]').click();

        //     // Check if button is disabled
        //     cy.get('button[type="submit"]').should('be.disabled');

        //     // Check if loader is visible
        //     cy.get('svg.animate-spin').should('be.visible');
        //     cy.contains('Loading...').should('be.visible');
        // });
    });    // 4. Navigation Tests
    describe('Navigation', () => {
        it('should have correct signup link', () => {
            cy.get('a.link').contains('Create account')
                .should('have.attr', 'href', '/signup');
        });
    });

    // 5. Responsive Design Tests
    describe('Responsive Design', () => {
        it('should display correctly on mobile view', () => {
            cy.viewport('iphone-6');
            cy.get('.h-screen').should('be.visible');
        });

        it('should display correctly on desktop view', () => {
            cy.viewport('macbook-15');
            cy.get('.lg\\:grid-cols-2').should('be.visible');
        });
    });
});