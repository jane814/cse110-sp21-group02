import '../scripts.js'

//test to make sure readings array is saved properly onto localStorage
let readings = generateReading('How can I create more balance in my friendships?');
test('reading is saved on localStorage', () => {
    saveReadings(readings);
    let retrieved = localStorage.getItem('readings);
    expect(retrieved).toBe(readings);
});
