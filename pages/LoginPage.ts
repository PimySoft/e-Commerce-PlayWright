import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ========== SELECTORS ==========

  get loginHeading(): Locator {
    return this.page.getByRole('heading', { name: /login to your account/i });
  }

  get emailInput(): Locator {
    return this.page.locator('form').filter({ hasText: 'Login' }).getByPlaceholder(/email address/i);
  }

  get passwordInput(): Locator {
    return this.page.getByPlaceholder(/password/i);
  }

  get loginButton(): Locator {
    return this.page.getByRole('button', { name: /login/i });
  }

  get signupHeading(): Locator {
    return this.page.getByRole('heading', { name: /new user signup/i });
  }

  get signupNameInput(): Locator {
    return this.page.getByPlaceholder(/name/i).first();
  }

  get signupEmailInput(): Locator {
    return this.page.getByPlaceholder(/email address/i).nth(1);
  }

  get signupButton(): Locator {
    return this.page.getByRole('button', { name: /signup/i });
  }

  get errorMessage(): Locator {
    return this.page.getByText(/your email or password is incorrect/i);
  }

  get loggedInAs(): Locator {
    return this.page.getByText(/logged in as/i);
  }

  get logoutButton(): Locator {
    return this.page.getByRole('link', { name: /logout/i });
  }

  get nameValidationError(): Locator {
    return this.signupNameInput;
  }

  get signupEmailValidationError(): Locator {
    return this.signupEmailInput;
  }

  get loginEmailValidationError(): Locator {
    return this.emailInput;
  }

  // ========== ACTIONS ==========

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async signup(name: string, email: string): Promise<void> {
    await this.signupNameInput.fill(name);
    await this.signupEmailInput.fill(email);
    await this.signupButton.click();
  }

  async logout(): Promise<void> {
    await this.logoutButton.click();
  }
}

