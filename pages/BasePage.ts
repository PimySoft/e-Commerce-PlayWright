import { Page, Locator, expect } from '@playwright/test';

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

  async verifyTitle(titlePattern: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(titlePattern);
  }

  async handleCookieConsent(): Promise<void> {
    try {
      const consentDialog = this.page.locator('.fc-consent-root');
      const isVisible = await consentDialog.isVisible({ timeout: 1000 }).catch(() => false);
      
      if (!isVisible) {
        return;
      }

      const acceptButton = this.page.getByRole('button', { name: /accept|agree|ok|allow|consent/i });
      const buttonVisible = await acceptButton.first().isVisible({ timeout: 2000 }).catch(() => false);
      
      if (buttonVisible) {
        await acceptButton.first().click();
        await consentDialog.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
      }
    } catch (error) {
      // Silently fail - consent dialog might not exist or already dismissed
    }
  }
}

