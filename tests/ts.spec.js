const { test,playwright} = require('@playwright/test');
 
test(async () => {

  // Launch browser 

  const browser = await playwright.chromium.launch();

  const context = await browser.newContext();

  const page = await context.newPage();

 

  try {

    // Navigate to the challenge page

    await page.goto('https://surveyrc.taxcreditco.com/automation-challenge');

 

    // Fill text fields and click Next

    await page.fill('#firstName', 'TestFirstName');

    await page.fill('#lastName', 'TestLastName');

    await page.fill('#emailAddress', 'test@example.com');

    await page.fill('#phoneNumber', '555-555-5555');

    await await page.click('text=Next >> button');

 

    // Answer "NO" to all questions and click Next

    await page.waitForSelector('text=Yes or No');

    const questions = await page.$$('text=Yes or No');

    for (const question of questions) {

      await question.nextElementSibling().click(); // Click adjacent "NO" radio button

    }

    await await page.click('text=Next >> button');

 

    // Verify name and redirection

    const nameElement = await page.locator('#firstName');

    const name = await nameElement.textContent();

    if (name !== 'TestFirstName') {

      throw new Error('Name verification failed!');

    }

    const finalUrl = await page.url();

    if (finalUrl !== 'https://www.experian.com/employer-services') {

      throw new Error('Redirection verification failed!');

    }

 

    console.log('Scenario completed successfully!');

  } catch (error) {

    console.error(error);

  } finally {

    await browser.close();

  }

})();