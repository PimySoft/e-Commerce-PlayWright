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

  get errorMessage(): Locator {
    return this.page.getByText(/your email or password is incorrect/i);
  }

  // ========== ACTIONS ==========

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

