import { Page, Locator } from '@playwright/test';

export class BasePage {
  constructor(protected readonly page: Page) {}

  get pageInstance(): Page {
    return this.page;
  }

  async goto(path: string = ''): Promise<void> {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
    await this.handleCookieConsent();
  }

  async handleCookieConsent(): Promise<void> {
    const consentDialog = this.page.locator('.fc-consent-root');
    const dialogCount = await consentDialog.count();
    
    if (dialogCount === 0) {
      return;
    }

    const acceptButton = this.page.getByRole('button', { name: /accept|agree|ok|allow|consent/i });
    const buttonCount = await acceptButton.count();
    
    if (buttonCount > 0) {
      await acceptButton.first().click();
      await consentDialog.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
    }
  }
}

