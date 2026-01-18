import { test, expect } from './fixtures';

test.describe('End-to-End User Workflow', () => {
  test('should complete full shopping journey', async ({ homePage, productsPage, cartPage }) => {
    await homePage.navigateToProducts();
    await productsPage.addFirstProductToCart();
    await productsPage.continueShopping();

    await homePage.navigateToCart();
    await expect(cartPage.emptyCartMessage).not.toBeVisible();
  });
});
