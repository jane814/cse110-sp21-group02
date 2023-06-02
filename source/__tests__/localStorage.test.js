import * as scripts from '../scripts.js';

// basic test to make sure readings array is saved properly onto localStorage
test('readings are saved on localStorage', () => {
  const readings = [];
  scripts.saveReadings(readings);
  const retrieved = JSON.parse(localStorage.getItem('readings'));
  expect(retrieved).toBe(readings);
});

// basic test to make sure that the saved array of readings is being retrieved correctly
test('readings are retrieved correctly from localStorage', () => {
  const readings = [];
  scripts.saveReadings(readings);
  const retrieved = scripts.getReadings();
  expect(retrieved).toBe(readings);
});

//basic test to make sure that a reading is being saved correctly
test('reading is saved on localStorage', () => {
  const readings = [];
  scripts.saveReadings(readings);
  const reading = scripts.generateReading('How can I create more balance in my friendships?');
  scripts.saveReading(reading);
  let retrieved = JSON.parse(localStorage.getItem('readings'));
  retrieved = retrieved[0];
  expect(retrieved).toBe(reading);
});

// basic test to make sure that a reading is being retrieved correctly
test('reading is saved on localStorage', () => {
  const readings = [];
  scripts.saveReadings(readings);
  const reading = scripts.generateReading('How can I create more balance in my friendships?');
  const key = reading.id;
  scripts.saveReading(reading);
  const retrieved = scripts.getReading(key);
  expect(retrieved).toBe(reading);
});

