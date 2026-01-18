import { test, expect } from './fixtures';

test.describe('Shopping Cart', () => {
  
  test.skip('should update product quantity in cart', async ({ productsPage, cartPage }) => {
    // SKIPPED: Cart page does not support updating quantity - quantity is read-only
  });

  test('should remove product from cart', async ({ productsPage, cartPage }) => {
    const productName = 'Men Tshirt';

    await productsPage.addProductToCartByName(productName);
    await productsPage.goToCart();

    await expect(cartPage.cartItemRow(productName)).toBeVisible();

    await cartPage.removeProductAndWait(productName);

    await expect(cartPage.cartItemRow(productName)).not.toBeVisible();
  });

  test('should display empty cart message when cart is empty', async ({ cartPage }) => {
    await expect(cartPage.emptyCartMessage).toBeVisible();
    await expect(cartPage.proceedToCheckoutButton).not.toBeVisible();
  });
});
