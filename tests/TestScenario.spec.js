const { test,firefox } = require('playwright');

(async () => {
  const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  // Step 1: Go to the URL
  await page.goto('https://surveyrc.taxcreditco.com/automation-challenge');

  // Step 2: Fill text fields and click Next
  await page.fill('input[name="fname"]', 'John');
  await page.fill('input[name="lname"]', 'Doe');
  await page.fill('input[name="email"]', 'john.doe@example.com');
  await page.click('text=Next');

  // Step 3: Answer "NO" to all questions and click Next
  await page.click('text=NO');
  await page.click('text=NO');
  await page.click('text=NO');
  await page.click('text=Next');

  // Step 4: Verify the name matches
  const fullName = await page.textContent('.container h1');
  if (fullName === 'John Doe') {
    console.log('Name matches!');
  } else {
    console.log('Name does not match!');
  }

  // Step 5: Assert redirection
  const url = page.url();
  if (url === 'https://www.experian.com/employer-services') {
    console.log('Redirected to Experian!');
  } else {
    console.log('Did not redirect to Experian.');
  }

  await browser.close();
})();
