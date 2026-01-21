import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  // ========== SELECTORS ==========

  get pageInstance(): Page {
    return this.page;
  }

  get consentDialog(): Locator {
    return this.page.locator('.fc-consent-root');
  }

  get cookieConsentAcceptButton(): Locator {
    return this.page.getByRole('button', { name: /accept|agree|ok|allow|consent/i });
  }

  get googleSurveyPopup(): Locator {
    return this.page.locator('[role="dialog"]').filter({ hasText: /answer questions to support/i });
  }

  get googleSurveyCloseButton(): Locator {
    return this.page.getByRole('button', { name: /close/i })
      .or(this.page.locator('button[aria-label*="close" i]'))
      .or(this.page.locator('button[aria-label*="Close" i]'));
  }

  get googleSurveyDoneButton(): Locator {
    return this.page.getByRole('button', { name: /done/i });
  }

  // ========== ACTIONS ==========

  async goto(path: string = ''): Promise<void> {
    await this.page.goto(path);
    await this.handleCookieConsent();
    await this.handleGoogleSurveyPopup();
  }

  async handleCookieConsent(): Promise<void> {
    const dialogCount = await this.consentDialog.count();
    
    if (dialogCount === 0) {
      return;
    }

    const buttonCount = await this.cookieConsentAcceptButton.count();
    
    if (buttonCount > 0) {
      await this.cookieConsentAcceptButton.first().click();
      await this.consentDialog.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
    }
  }

  async handleGoogleSurveyPopup(): Promise<void> {
    const popupCount = await this.googleSurveyPopup.count();
    
    if (popupCount === 0) {
      return;
    }

    const closeButtonCount = await this.googleSurveyCloseButton.count();
    
    if (closeButtonCount > 0) {
      await this.googleSurveyCloseButton.first().click({ timeout: 2000 }).catch(() => {});
      await this.googleSurveyPopup.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
      return;
    }

    const doneButtonCount = await this.googleSurveyDoneButton.count();
    
    if (doneButtonCount > 0) {
      await this.googleSurveyDoneButton.first().click({ timeout: 2000 }).catch(() => {});
      await this.googleSurveyPopup.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
    }
  }
}
