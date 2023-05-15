let tarotReading = {
  id: "a",                 // Unique ID of the reading (complete spec/adrs/0001-unique-ids.md)
  name: "Example Reading", // Name of the reading
  time: 0,                 // Time of reading (Unix Timestamp (ms))
  cards: ["The Fool", "Strength", "The Lovers"], // Order Matters, names should be standardized, 3 cards exactly (for now)
  fortune: "You will have a good day today!", // This will be very long
  userInput: "This is the user input text" // This can be very long
}