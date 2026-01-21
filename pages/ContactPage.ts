import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export class ContactPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // ========== SELECTORS ==========

  get contactHeading(): Locator {
    return this.page.getByRole('heading', { name: /get in touch/i });
  }

  get nameInput(): Locator {
    return this.page.getByPlaceholder(/name/i);
  }

  get emailInput(): Locator {
    return this.page.getByRole('textbox', { name: 'Email', exact: true });
  }

  get subjectInput(): Locator {
    return this.page.getByPlaceholder(/subject/i);
  }

  get messageTextarea(): Locator {
    return this.page.getByPlaceholder(/your message here/i);
  }

  get submitButton(): Locator {
    return this.page.getByRole('button', { name: /submit/i });
  }

  get successMessage(): Locator {
    return this.page.locator('#contact-page').getByText(/success! your details have been submitted successfully/i);
  }


  // ========== ACTIONS ==========

  async fillContactForm(formData: ContactFormData): Promise<void> {
    await this.nameInput.fill(formData.name);
    await this.emailInput.fill(formData.email);
    await this.subjectInput.fill(formData.subject);
    await this.messageTextarea.fill(formData.message);
  }

  async submitFormAndHandleAlert(): Promise<void> {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.submitButton.click();
  }
}
