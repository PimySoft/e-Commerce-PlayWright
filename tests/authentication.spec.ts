import { test, expect } from './fixtures';

test.describe('User Authentication', () => {
  test('should display login page', async ({ loginPage }) => {
    await expect(loginPage.loginHeading).toBeVisible();
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should show error for invalid login credentials', async ({ loginPage }) => {
    await loginPage.login('invalid@email.com', 'wrongpassword');

    await expect(loginPage.errorMessage).toBeVisible();
  });

  test('should validate email format in login form', async ({ loginPage }) => {
    await loginPage.emailInput.fill('invalid-email');
    await loginPage.passwordInput.fill('password123');
    await loginPage.loginButton.click();
    await loginPage.emailInput.blur();

    await expect.poll(async () => {
      return await loginPage.emailInput.evaluate((el: HTMLInputElement) => el.validity.valid);
    }).toBeFalsy();
  });
});
