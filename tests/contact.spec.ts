import { test, expect } from './fixtures';
import { ContactFormData } from '../pages/ContactPage';

test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ contactPage }) => {
    const formData: ContactFormData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Test Inquiry',
      message: 'This is a test message for contact form submission.',
    };

    await contactPage.fillContactForm(formData);
    await contactPage.submitFormAndHandleAlert();

    await expect(contactPage.successMessage).toBeVisible();
  });

  test('should validate all required fields', async ({ contactPage }) => {
    await contactPage.submitEmptyForm();

    const inputs = [
      contactPage.nameInput,
      contactPage.emailInput,
      contactPage.subjectInput,
      contactPage.messageTextarea
    ];

    for (const input of inputs) {
      await expect.poll(async () => {
        return await input.evaluate((el: HTMLInputElement | HTMLTextAreaElement) => el.validity.valid);
      }).toBeFalsy();
    }
  });
});
