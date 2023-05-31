import '../scripts.js'

//basic test to make sure readings array is saved properly onto localStorage
test('readings are saved on localStorage', () => {
    let readings = [];
    saveReadings(readings);
    let retrieved = JSON.parse(localStorage.getItem('readings));
    expect(retrieved).toBe(readings);
});

//basic test to make sure that the saved array of readings is being retrieved correctly
test('readings are retrieved correctly from localStorage', () => {
    let readings = [];
    saveReadings(readings);
    let retrieved = getReadings();
    expect(retrieved).toBe(readings);
});

//basic test to make sure that a reading is being saved correctly
test('reading is saved on localStorage', () => {
    let readings = [];
    saveReadings(readings);
    let reading = generateReading('How can I create more balance in my friendships?');
    let key = reading.id;
    saveReading(reading);
    let retrieved = JSON.parse(localStorage.getItem('readings));
    retrieved = readings[0];
    expect(retrieved).toBe(reading);
});

//basic test to make sure that a reading is being retrieved correctly
test('reading is saved on localStorage', () => {
    let readings = [];
    saveReadings(readings);
    let reading = generateReading('How can I create more balance in my friendships?');
    let key = reading.id;
    saveReading(reading);
    let retrieved = getReading(key);
    expect(retrieved).toBe(reading);
});

