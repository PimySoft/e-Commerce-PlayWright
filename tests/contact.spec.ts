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

});
