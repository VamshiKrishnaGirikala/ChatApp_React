import React from 'react';
import { mount } from 'cypress/react';
import LoginPage from './LoginPage';
import { MemoryRouter } from 'react-router-dom';
import "../../src/index.css"; // Import global styles

// Mock the useAuthStore hook
let mockLogin;
let mockUseAuthStore;

// Replace the actual useAuthStore with a mock implementation
const useAuthStore = () => mockUseAuthStore;

// Mock the module manually
Cypress.Commands.add('mockUseAuthStore', (overrides = {}) => {
    mockLogin = cy.stub();
    mockUseAuthStore = {
        login: mockLogin,
        isLoggingIn: false, // Default state
        ...overrides, // Allow overriding default values
    };
});

describe('<LoginPage /> Component Tests', () => {
    beforeEach(() => {
        // Mock the useAuthStore hook
        cy.mockUseAuthStore();

        // Mount the component
        mount(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
    });

    it('should render the login page correctly', () => {
        cy.contains('Welcome Back').should('be.visible');
        cy.contains('Sign in to your account').should('be.visible');
        cy.get('input[type="email"]').should('exist');
        cy.get('input[type="password"]').should('exist');
        cy.get('button[type="submit"]').should('exist').and('contain', 'Sign in');
    });

    it('should validate the email input field', () => {
        cy.get('input[type="email"]').should('exist').type('john.doe@example.com');
        cy.get('input[type="email"]').should('have.value', 'john.doe@example.com');
    });

    it('should validate the password input field', () => {
        cy.get('input[type="password"]').should('exist').type('Password@123');
        cy.get('input[type="password"]').should('have.value', 'Password@123');
    });

    it('should toggle password visibility', () => {
        cy.get('input[type="password"]').should('exist');
        cy.get('button').find('svg.lucide-eye').click();
        cy.get('input[type="text"]').should('exist');
        cy.get('button').find('svg.lucide-eye-off').click();
        cy.get('input[type="password"]').should('exist');
    });

    it('should disable the submit button when logging in', () => {
        // Simulate the `isLoggingIn` state
        cy.mockUseAuthStore({ isLoggingIn: true });
        mount(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        cy.get('button[type="submit"]').should('be.disabled');
    });

    it('should display a loader while logging in', () => {
        // Simulate the `isLoggingIn` state
        cy.mockUseAuthStore({ isLoggingIn: true });
        mount(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );
        cy.get('button[type="submit"]').click();
        cy.get("button").find('.animate-spin').should('be.visible');
    });

    it('should display an error message for empty fields', () => {
        cy.get('button[type="submit"]').click();
        cy.contains('Please fill all the fields').should('be.visible');
    });

    it('should display an error message for invalid credentials', () => {
        // Simulate invalid login
        cy.get('input[type="email"]').type('invalid.email@example.com');
        cy.get('input[type="password"]').type('WrongPassword');
        cy.get('button[type="submit"]').click();
        cy.contains('Invalid email or password').should('be.visible');
    });

    it('should render the right-side content correctly', () => {
        cy.viewport(1280, 720);
        cy.contains('Welcome back!').should('be.visible');
        cy.contains('Sign in to continue your conversations and catch up with your messages.').should('be.visible');
    });
});