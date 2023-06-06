const puppeteer = require('puppeteer');

describe('Basic user flow for Website', () => {
    // Visit the web app
    beforeAll(async () => {
      await page.goto('https://cse110-sp21-group02.github.io/cse110-sp21-group02/source/index.html');
    });
  
    // Next user will generate a fortune 
    it('Generate a fortune', async () => {
      console.log('Generating a fortune...');
      // Select and click generate button
      const generateButton = await page.getElementById('generate-btn');
      await generateButton.click();

      // Select the text of the fortune
      const fortuneReading = document.getElementById('meaning');

      // Expect text to not be empty
      expect(fortuneReading.classList.toggle('show')).toBe(true);
    });
  
    // User will save the fortune
    it('Saving a fortune', async () => {
      console.log('Saving a fortune...');
      // Select and click save button
      const saveButton = await page.getElementById('save');
      await saveButton.click();

      // Get local storage
      const currentStorage = await page.evaluate(() => {
        return localStorage.getItem('readings');
      });

      // Expect local storage to not be empty
      expect(currentStorage != '[]').toBe(true);
    });
  
    // User check history
    it('Checking History', async () => {
        console.log('Checking History...');
        // Select and click history button
        const histButton = await page.getElementById('history-button');
        await histButton.click();
  
        // Select the most recent fortune to be displayed
        const histDisplayButton = await page.getElementById('history-item-btn-display');
        await histDisplayButton.click();

        // Expect fortune displayed to not be empty
        const meaning = document.getElementById('meaning');
        expect(meaning.classList.toggle('show')).toBe(true);
    });
  
    // User deletes fortune from history
    it('Deleting a fortune', async () => {
        console.log('Deleting a fortune...');
        // Select and click delete button
        const deleteButton = await page.getElementById('history-item-btn-delete');
        await deleteButton.click();

        // Get local storage
        const currentStorage = await page.evaluate(() => {
          return localStorage.getItem('readings');
        });

        // Expect local storage to be empty
        expect(currentStorage).toBe('[]');
    });

    // User returns to homepage
    it('Return to homepage', async () => {
        console.log('Returning to home...');
        // Select and click home button
        const homeButton = await page.getElementById('home-button');
        await homeButton.click();

        // Expect local storage to be empty
        const currentStorage = await page.evaluate(() => {
          return localStorage.getItem('readings');
        });

        // Expect local storage to be empty
        expect(currentStorage).toBe('[]');
    });
  
  });