import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ========== SELECTORS ==========

  get cartHeading(): Locator {
    return this.page.getByText(/shopping cart/i);
  }

  get proceedToCheckoutButton(): Locator {
    return this.page.getByRole('link', { name: /proceed to checkout/i });
  }

  get emptyCartMessage(): Locator {
    return this.page.getByText(/cart is empty/i);
  }

  cartItemRow(productName: string): Locator {
    return this.page.getByRole('row').filter({ hasText: new RegExp(productName, 'i') }).first();
  }

  quantityInput(productName: string): Locator {
    const row = this.cartItemRow(productName);
    return row.getByRole('cell').nth(3).getByRole('button');
  }

  removeButton(productName: string): Locator {
    const row = this.cartItemRow(productName);
    return row.getByRole('link', { name: /remove|delete/i })
      .or(row.getByRole('button', { name: /remove|delete/i }))
      .or(row.locator('a.cart_quantity_delete, button.cart_quantity_delete, a[class*="delete"], button[class*="delete"]'))
      .first();
  }

  productPrice(productName: string): Locator {
    return this.cartItemRow(productName).getByText(/rs\.|₹|\$|€|£/i).first();
  }

  productTotal(productName: string): Locator {
    const row = this.cartItemRow(productName);
    return row.getByText(/rs\.|₹|\$|€|£/i).nth(1);
  }

  // ========== ACTIONS ==========

  async removeProduct(productName: string): Promise<void> {
    await this.removeButton(productName).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }

  async getProductQuantity(productName: string): Promise<string> {
    return await this.quantityInput(productName).textContent() || '0';
  }

  async removeProductAndWait(productName: string): Promise<void> {
    await this.removeProduct(productName);
    await expect(this.cartItemRow(productName)).not.toBeVisible();
  }

  async getProductPriceValue(productName: string): Promise<number> {
    const priceText = await this.productPrice(productName).textContent();
    return parseFloat(priceText?.replace(/[^0-9.]/g, '') || '0');
  }

  async getProductTotalValue(productName: string): Promise<number> {
    const totalText = await this.productTotal(productName).textContent();
    return parseFloat(totalText?.replace(/[^0-9.]/g, '') || '0');
  }

  async verifyTotalPriceCalculation(productName: string, expectedQuantity: number): Promise<void> {
    const price = await this.getProductPriceValue(productName);
    const total = await this.getProductTotalValue(productName);
    expect(total).toBe(price * expectedQuantity);
  }

  async verifyCheckoutPageLoaded(): Promise<void> {
    await this.page.getByText(/checkout/i).waitFor({ state: 'visible' });
  }
}

