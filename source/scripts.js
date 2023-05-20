const USER_INPUT_TEXT_BOX_ID = "user-input";
const GENERATE_BUTTON_ID = "generate-button";
const OUTPUT_TEXT_BOX_ID = "output-text";

let currentReading = {}; // The current reading object, updated by displayReading


/**
 * Retrieves user's question from the text box
 * @returns {string} The user input text
 */
const getUserInputText = () => {
  const userInput = document.getElementById(USER_INPUT_TEXT_BOX_ID);
  return userInput.value;
}

/**
 * @returns {Array} The array of readings from localStorage
 */
const getReadings = () => {
  return [];
}

/**
 * 
 * @param {Array} readings The array of readings to save to localStorage
 */
const saveReadings = (readings) => {

}

/**
 * 
 * @param {Object} reading The reading to save to localStorage
 */
const saveReading = (reading) => {
}

/**
 * Renames reading, saves to localStorage
 * @param {string} name The new name of the reading
 * @param {string} id The id of the reading to rename
 */
const renameReading = (name, id) => {
  
}

/**
 * @param {string} id The id of the reading to get
 * @returns {Object} The reading object
 */
const getReading = (id) => {
  return {};
}

/**
 * @param {string} id The id of the reading to delete
 * @returns {boolean} True if successful, false otherwise
 */
const deleteReading = (id) => {
  return false;
}

/**
 * 
 * @returns {boolean} True if any readings deleted, false otherwise
 */
const deleteAllReadings = () => {
  
}



/**
 * Creates a reading object from the user input text
 * @returns {Object} The reading object
 */
const generateReading = () => {
  return {};
}

/**
 * @param {Object} reading The reading to generate a link for
 */
const generateReadingLink = (reading) => {

}
/**
 * Activated by the retry button, regenerates the cards and meaning
 * 
 * @param {Object} reading The reading to regenerate
 * @returns {Object} The reading object
 */
const regenerateReading = (reading) => {
  return {};
}
/**
 * Wwitches the front end to display the reading
 */
const displayReading = (reading) => {
  
}

const getVoiceInput = () => {

}

/**
 * Says what the user inputted aloud?
 */
const dictateUserInput = () => {
      
}


/**
 * Says the fortune aloud
 */
const dictateReading = () => {
  
}


