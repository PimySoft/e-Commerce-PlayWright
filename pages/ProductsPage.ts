import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ========== SELECTORS ==========

  get searchInput(): Locator {
    return this.page.getByPlaceholder(/search product/i);
  }

  get searchButton(): Locator {
    return this.page.getByRole('button', { name: /search/i });
  }

  get productsHeading(): Locator {
    return this.page.getByRole('heading', { name: /all products/i });
  }

  get firstProductCard(): Locator {
    return this.page.getByRole('article').or(this.page.locator('.product-image-wrapper')).first();
  }

  get viewProductButtons(): Locator {
    return this.page.getByRole('link', { name: /view product/i });
  }

  get addToCartButtons(): Locator {
    return this.page.getByRole('button', { name: /add to cart/i })
      .or(this.page.locator('a, button, [role="button"]').filter({ hasText: /add to cart/i }));
  }

  get productModal(): Locator {
    return this.page.getByRole('dialog').or(this.page.locator('#cartModal'));
  }

  get continueShoppingButton(): Locator {
    return this.page.getByRole('button', { name: /continue shopping/i });
  }

  get viewCartButton(): Locator {
    return this.page.getByRole('link', { name: /view cart/i });
  }

  productCardByName(productName: string): Locator {
    const productNameText = this.page.getByText(new RegExp(productName, 'i')).first();
    return productNameText.locator('..').locator('..')
      .locator('.productinfo, .product-image-wrapper, article')
      .first();
  }

  addToCartButtonForProduct(productName: string): Locator {
    const productCard = this.productCardByName(productName);
    return productCard.getByRole('button', { name: /add to cart/i })
      .or(productCard.getByRole('link', { name: /add to cart/i }))
      .or(productCard.locator('a, button, [role="button"]').filter({ hasText: /add to cart/i }))
      .first();
  }

  get searchResultsHeading(): Locator {
    return this.page.getByText(/searched products|search results/i);
  }

  get availabilityText(): Locator {
    return this.page.getByText(/availability/i);
  }

  get conditionText(): Locator {
    return this.page.getByText(/condition/i);
  }

  productInCart(productName: string): Locator {
    return this.page.getByText(productName);
  }

  // ========== ACTIONS ==========

  async searchProduct(productName: string): Promise<void> {
    await this.searchInput.fill(productName);
    await this.searchInput.press('Enter');
    await this.page.waitForLoadState('domcontentloaded');
    await this.handleCookieConsent();
  }

  async addFirstProductToCart(): Promise<void> {
    await this.handleCookieConsent();
    const productCard = this.firstProductCard;
    await expect(productCard).toBeVisible();
    await productCard.hover();
    const addButton = this.addToCartButtons.first();
    await addButton.waitFor({ state: 'visible', timeout: 5000 });
    await addButton.click();
  }

  async addProductToCartByName(productName: string): Promise<void> {
    await this.goto('/products');
    await this.handleCookieConsent();
    await this.firstProductCard.waitFor({ state: 'visible', timeout: 10000 });
    const productCard = this.productCardByName(productName);
    await expect(productCard).toBeVisible({ timeout: 15000 });
    await productCard.hover();
    const addButton = this.addToCartButtonForProduct(productName);
    await addButton.waitFor({ state: 'visible', timeout: 5000 });
    await addButton.click();
  }

  async viewFirstProduct(): Promise<void> {
    await this.viewProductButtons.first().click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async goToCart(): Promise<void> {
    await this.viewCartButton.click();
  }

  async addMultipleProductsToCart(productNames: string[]): Promise<void> {
    for (const productName of productNames) {
      await this.goto('/products');
      await this.addProductToCartByName(productName);
      await this.continueShopping();
    }
  }
}

