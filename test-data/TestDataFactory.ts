import { ContactFormData } from '../pages/ContactPage';

export class TestDataFactory {
  // Product Data
  static getProductNames() {
    return {
      menTshirt: 'Men Tshirt',
      blueJeans: 'Blue Jeans',
      stylishDress: 'Stylish Dress',
    };
  }

  static getSearchTerms() {
    return {
      blue: 'blue',
      men: 'men',
      dress: 'dress',
      nonexistent: 'nonexistentproductxyz123',
    };
  }

  // User Credentials
  static getValidCredentials() {
    return {
      email: 'valid.user@example.com',
      password: 'ValidPassword123',
    };
  }

  static getInvalidCredentials() {
    return {
      email: 'invalid@email.com',
      password: 'wrongpassword',
    };
  }

  static getInvalidEmailFormats() {
    return {
      noAtSymbol: 'invalid-email',
      noDomain: 'test@',
      noTld: 'test@example',
      empty: '',
    };
  }

  // Contact Form Data
  static createContactFormData(overrides?: Partial<ContactFormData>): ContactFormData {
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      subject: 'Test Inquiry',
      message: 'This is a test message for contact form submission.',
      ...overrides,
    };
  }

  static createInvalidContactFormData(): Partial<ContactFormData> {
    return {
      name: '',
      email: 'invalid-email',
      subject: '',
      message: '',
    };
  }

  // Random/Generated Data
  static generateRandomEmail(): string {
    const timestamp = Date.now();
    return `test.${timestamp}@example.com`;
  }

  static generateRandomName(): string {
    const names = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams'];
    return names[Math.floor(Math.random() * names.length)];
  }
}

