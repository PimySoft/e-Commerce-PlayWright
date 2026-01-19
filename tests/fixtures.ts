import { test as base, Page } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductsPage } from '../pages/ProductsPage';
import { CartPage } from '../pages/CartPage';
import { LoginPage } from '../pages/LoginPage';
import { ContactPage } from '../pages/ContactPage';

type TestFixtures = {
  homePage: HomePage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  loginPage: LoginPage;
  contactPage: ContactPage;
};

export const test = base.extend<TestFixtures>({
  page: async ({ page }, use) => {
    // Set localStorage before navigation to bypass popup
    // This is more reliable than clicking the popup after pge loads
    await page.addInitScript(() => {
      // Set consent in localStorage before page loads
      window.localStorage.setItem('fc_cookie_consent', 'accepted');
      window.localStorage.setItem('fc_cookieconsent', 'true');
      // Also try common cookie consent library storage keys
      window.localStorage.setItem('cookieconsent_status', 'allow');
    });
    
    await use(page);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto('/');
    await use(homePage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await productsPage.goto('/products');
    await use(productsPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await cartPage.goto('/view_cart');
    await use(cartPage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto('/login');
    await use(loginPage);
  },

  contactPage: async ({ page }, use) => {
    const contactPage = new ContactPage(page);
    await contactPage.goto('/contact_us');
    await use(contactPage);
  },
});

export { expect } from '@playwright/test';

