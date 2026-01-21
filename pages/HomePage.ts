import { Page, Locator } from '@playwright/test';
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

  get pageHeading(): Locator {
    return this.page.getByRole('heading', { name: /automationexercise/i });
  }

  // ========== ACTIONS ==========

  async navigateToProducts(): Promise<void> {
    await this.productsLink.click();
    await this.page.waitForURL('**/products**');
    await this.handleCookieConsent();
  }

  async navigateToCart(): Promise<void> {
    await this.cartLink.click();
    await this.page.waitForURL('**/view_cart**');
    await this.handleCookieConsent();
  }
}
