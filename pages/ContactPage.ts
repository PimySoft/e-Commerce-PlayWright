import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import * as fs from 'fs';
import * as path from 'path';

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

  get uploadFileInput(): Locator {
    return this.page.getByLabel(/attach file|upload file/i).or(this.page.locator('input[type="file"]'));
  }

  get nameValidationError(): Locator {
    return this.nameInput;
  }

  get emailValidationError(): Locator {
    return this.emailInput;
  }

  get subjectValidationError(): Locator {
    return this.subjectInput;
  }

  get messageValidationError(): Locator {
    return this.messageTextarea;
  }

  get fileSelectedIndicator(): Locator {
    return this.uploadFileInput;
  }

  // ========== ACTIONS ==========

  async fillContactForm(formData: ContactFormData): Promise<void> {
    await this.nameInput.fill(formData.name);
    await this.emailInput.fill(formData.email);
    await this.subjectInput.fill(formData.subject);
    await this.messageTextarea.fill(formData.message);
  }

  async uploadFile(filePath: string): Promise<void> {
    await this.uploadFileInput.setInputFiles(filePath);
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async submitFormAndHandleAlert(): Promise<void> {
    this.page.once('dialog', async dialog => {
      await dialog.accept();
    });
    await this.submitButton.click();
  }

  async submitFormAndVerifySuccess(): Promise<void> {
    await this.submitFormAndHandleAlert();
    await expect(this.successMessage).toBeVisible();
  }

  async submitEmptyForm(): Promise<void> {
    await this.submitButton.click();
  }

  async fillAndSubmitForm(formData: ContactFormData): Promise<void> {
    await this.fillContactForm(formData);
    await this.submitFormAndVerifySuccess();
  }

  async fillFormWithInvalidEmail(formData: ContactFormData): Promise<void> {
    await this.fillContactForm(formData);
  }

  async fillFormAndUploadFile(formData: ContactFormData, filePath: string): Promise<void> {
    await this.fillContactForm(formData);
    await this.uploadFile(filePath);
  }

  async uploadFileAndSubmitForm(formData: ContactFormData, filePath: string): Promise<void> {
    await this.fillFormAndUploadFile(formData, filePath);
    await this.submitFormAndHandleAlert();
  }

  async submitFormWithFileUpload(
    formData: ContactFormData,
    fileContent: string = 'Test file content for upload'
  ): Promise<void> {
    const testDataDir = path.join(process.cwd(), 'test-data');
    if (!fs.existsSync(testDataDir)) {
      fs.mkdirSync(testDataDir, { recursive: true });
    }

    const testFilePath = path.join(testDataDir, 'test-file.txt');
    
    try {
      fs.writeFileSync(testFilePath, fileContent);
      await this.uploadFileAndSubmitForm(formData, testFilePath);
    } finally {
      if (fs.existsSync(testFilePath)) {
        fs.unlinkSync(testFilePath);
      }
    }
  }
}

