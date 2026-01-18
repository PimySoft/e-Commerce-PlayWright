import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ========== SELECTORS ==========

  get homeLink(): Locator {
    return this.page.getByRole('link', { name: /home/i });
  }

  get productsLink(): Locator {
    return this.page.getByRole('link', { name: /products/i });
  }

  get cartLink(): Locator {
    return this.page.getByRole('link', { name: /cart/i });
  }

  get loginLink(): Locator {
    return this.page.getByRole('link', { name: /signup|login/i });
  }

  get testCasesLink(): Locator {
    return this.page.getByRole('link', { name: /test cases/i });
  }

  get apiTestingLink(): Locator {
    return this.page.getByRole('link', { name: /api testing/i });
  }

  get videoTutorialsLink(): Locator {
    return this.page.getByRole('link', { name: /video tutorials/i });
  }

  get contactUsLink(): Locator {
    return this.page.getByRole('link', { name: /contact us/i });
  }

  get pageHeading(): Locator {
    return this.page.getByRole('heading', { name: /automationexercise/i });
  }

  // ========== ACTIONS ==========


  async navigateToLogin(): Promise<void> {
    await this.loginLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToProducts(): Promise<void> {
    await this.productsLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToCart(): Promise<void> {
    await this.cartLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToContact(): Promise<void> {
    await this.contactUsLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async navigateToHome(): Promise<void> {
    await this.homeLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }
}

