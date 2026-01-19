import { test, expect } from './fixtures';

test.describe('Products Page', () => {
  test('should search for products', async ({ productsPage }) => {
    const searchTerm = 'blue';
    await productsPage.searchProduct(searchTerm);

    await expect(productsPage.productCardByName(searchTerm)).toBeVisible();
  });

  test('should add product to cart', async ({ productsPage }) => {
    await productsPage.addFirstProductToCart();

    await expect(productsPage.productModal).toBeVisible();
    await expect(productsPage.viewCartButton).toBeVisible();

    await productsPage.continueShopping();
    await expect(productsPage.productModal).not.toBeVisible();
  });

  test('should handle empty search query', async ({ productsPage }) => {
    await productsPage.searchProduct('');
    await expect(productsPage.firstProductCard).toBeVisible();
  });

  test('should handle search with no results', async ({ productsPage }) => {
    const searchTerm = 'nonexistentproductxyz123';
    await productsPage.searchProduct(searchTerm);
    
    const productCard = productsPage.productCardByName(searchTerm);
    const count = await productCard.count();
    expect(count).toBe(0);
  });
});
