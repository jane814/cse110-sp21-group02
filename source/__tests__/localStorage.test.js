const scripts = require('../scripts');

// basic test to make sure readings array is saved properly onto localStorage
test('readings are saved on localStorage', () => {
  const readings = [];
  scripts.saveReadings(readings);
  const retrieved = JSON.parse(localStorage.getItem('readings'));
  expect(retrieved).toEqual(readings);
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

// basic test to make sure that a reading is removed properly
test('reading is deleted on localStorage', () => {
  const readings = [];
  scripts.saveReadings(readings);
  const reading = scripts.generateReading('How can I create more balance in my friendships?');
  const key = reading.id;
  scripts.saveReading(reading);
  scripts.deleteReading(key);
  const retrieved = JSON.parse(localStorage.getItem('readings'));
  expect(retrieved).toBe([]);
});

// basic test to make sure that all readings are removed properly
test('readings are deleted on localStorage', () => {
  const readings = [];
  scripts.saveReadings(readings);
  const reading = scripts.generateReading('How can I create more balance in my friendships?');
  const key = reading.id;
  scripts.saveReading(reading);
  scripts.deleteReadings();
  const retrieved = JSON.parse(localStorage.getItem('readings'));
  expect(retrieved).toBe([]);
});

// basic test to make sure that a reading is renamed properly
test('reading is renamed on localStorage', () => {
  const readings = [];
  scripts.saveReadings(readings);
  const reading = scripts.generateReading('How can I create more balance in my friendships?');
  const key = reading.id;
  scripts.saveReading(reading);
  scripts.renameReading('test1',key);
  const retrieved = JSON.parse(scripts.getReading(key));
  expect(retrieved.name).toBe('test1');
});



