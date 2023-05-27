const USER_INPUT_TEXT_BOX_ID = 'user-input';
const GENERATE_BUTTON_ID = 'generate-button';
const OUTPUT_TEXT_BOX_ID = 'output-text';
//const QUESTION_LIST_ID = 'question-list';
const DRAW_CARDS_BUTTON_ID = 'draw-cards';

const QUESTION_LIST = document.getElementById('myDropdown');

//const output = document.getElementById('meaning');

// When the user clicks on the button, toggle between hiding and showing the dropdown content 
function dropDown() {
  //document.getElementById("myDropdown").classList.toggle("show");
  const dropdownContent = document.getElementById('myDropdown');
  dropdownContent.classList.toggle("show");

  // Clear the existing content
  dropdownContent.innerHTML = '';

  // Generate the question links
  for (let i = 0; i < predefinedQuestions.length; i++) {
    const question = predefinedQuestions[i];

    // Create a new <a> element
    const questionLink = document.createElement('a');
    questionLink.href = '#';
    questionLink.textContent = question;

    // Append the question link to the dropdown content
    dropdownContent.appendChild(questionLink);

  }

}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              openDropdown.classList.remove('show');
          }
      }
  }
}



// The current reading object, updated by displayReading
let currentReading = {}; 


// The drawable tarot cards (only the Major Arcana for now)
const cards = [
  'The Fool',    'The Magician',    'The High Priestess',
  'The Empress',    'The Emperor',    'The Hierophant',
  'The Lovers',    'The Chariot',    'Strength',
  'The Hermit',    'Wheel of Fortune',    'Justice',
  'The Hanged Man',    'Death',    'Temperance',
  'The Devil',    'The Tower',    'The Star',    'The Sun',
  'The Moon',    'Judgement',    'The World'
];

// The meanings and weights of each tarot card (only the Major Arcana for now)
const cardResponseData = {
  'The Fool': {
    pastReading: 'The Fool card in the past position suggests that you have experienced a phase of new beginnings, spontaneity, and stepping into the unknown. You may have embarked on a journey or taken risks with a sense of innocence and curiosity. This card indicates that your past was marked by a willingness to embrace new experiences, even if they carried an element of uncertainty. These experiences have shaped your current outlook and have set the stage for your present circumstances.',
    presentReading: 'In the present position, the Fool card signifies that you are currently at the beginning of a new chapter or embarking on a fresh venture. It represents a sense of adventure, freedom, and embracing the unknown. This card encourages you to trust your instincts, take a leap of faith, and approach your current situation with an open mind. It suggests that a childlike wonder and a willingness to take risks can lead to exciting opportunities and personal growth in the present moment.',
    futureReading: 'When the Fool card appears in the future position, it indicates that you will soon enter a phase of new beginnings, uncharted territory, and unexpected opportunities. The card invites you to have faith in the journey ahead and to embrace a sense of adventure. It suggests that you may need to step outside your comfort zone and take bold leaps of faith in pursuit of your goals. The Fool card assures you that by embracing spontaneity, remaining open to possibilities, and trusting in the process, you will be guided towards a fulfilling and transformative future.',
    pastWeight: 3,
    presentWeight: 4,
    futureWeight: 5,
  },
  'The Magician': {
    pastReading: 'The Magician card in the past position suggests that you have experienced a phase of empowerment, manifestation, and harnessing your skills and abilities. You may have had a period where you felt a strong sense of purpose and were able to utilize your talents effectively. This card indicates that your past was marked by a time of taking action, being resourceful, and making things happen through your unique abilities. These experiences have shaped your current outlook and have contributed to the foundation of your present circumstances',
    presentReading: 'In the present position, the Magician card signifies that you are currently in a position of power and influence. It represents the ability to manifest your desires and make things happen through your focused intentions and willpower. This card encourages you to recognize the resources and talents at your disposal and to use them creatively and effectively. It suggests that you have the capability to bring about positive change and to align your actions with your goals in the present moment.',
    futureReading: 'When the Magician card appears in the future position, it indicates that you will soon enter a phase where your skills, talents, and personal power will play a significant role. The card suggests that you will have the ability to shape your future and manifest your aspirations through your focused intention and action. It invites you to embrace your creative potential and to trust in your abilities to bring about desired outcomes. The Magician card assures you that by harnessing your inner resources and staying aligned with your goals, you can create a future filled with possibilities and success.',
    pastWeight: 4,
    presentWeight: 5,
    futureWeight: 4,
  },
  'The High Priestess': {
    pastReading: 'The High Priestess in the past position suggests that you have experienced a phase of intuitive exploration, inner wisdom, and connecting with your subconscious. It indicates that you have relied on your intuition and tapped into your inner knowledge to navigate past situations. This card suggests that your past was marked by a time of seeking answers within yourself and trusting your instincts.',
    presentReading: 'In the present position, the High Priestess represents a phase of heightened intuition, mystery, and inner guidance. It signifies that you are currently in touch with your subconscious mind and can access deep wisdom and insights. The High Priestess card encourages you to listen to your intuition and trust the messages that arise from within. It suggests that paying attention to your dreams, symbols, and subtle cues will provide valuable guidance for your present circumstances.',
    futureReading: 'When the High Priestess appears in the future position, it indicates that you will soon enter a phase of profound introspection, inner knowing, and spiritual exploration. This card suggests that you will be guided by your intuition and your connection with the unseen realms. The High Priestess card encourages you to deepen your understanding of yourself and the world around you through spiritual practices, meditation, and introspection. It promises that by trusting your inner guidance, you will find answers and clarity in the future.',
    pastWeight: 2,
    presentWeight: 3,
    futureWeight: 2,
  },
  'The Empress': {
    pastReading: 'The Empress in the past position suggests that you have experienced a phase of nurturing, abundance, and creative expression. It indicates that in the past, you may have embraced your feminine energy, nurtured relationships, and cultivated a sense of abundance in various aspects of your life. The Empress card signifies a period of growth, creativity, and the manifestation of your ideas into tangible results.',
    presentReading: 'In the present position, the Empress represents a phase of fertility, creativity, and embracing the nurturing aspects of your life. It suggests that you are currently experiencing a period of abundance, both in material and emotional realms. The Empress card encourages you to tap into your creativity, connect with your sensuality, and nurture your relationships and projects. It signifies a time of growth, beauty, and the potential for new beginnings.',
    futureReading: 'When the Empress appears in the future position, it indicates that you will soon enter a phase of abundant possibilities, creativity, and nurturing energy. This card suggests that in the future, you will have opportunities to manifest your desires, express your creativity, and experience a sense of fulfillment. The Empress card encourages you to embrace your feminine power, trust in the natural flow of life, and bring forth your ideas and projects with love and care. It promises that the future holds a fertile ground for growth and nurturing experiences.',
    pastWeight: 5,
    presentWeight: 4,
    futureWeight: 5,
  },
  'The Hierophant': {
    pastReading: 'The Hierophant in the past position suggests that you have experienced a phase of seeking guidance, tradition, and spiritual exploration. It indicates that in the past, you may have turned to established beliefs, institutions, or mentors for wisdom and guidance. The Hierophant card signifies a period of learning, following traditional paths, and seeking higher knowledge to shape your understanding of the world.',
    presentReading: 'In the present position, the Hierophant represents a phase of spiritual connection, seeking guidance, and adhering to established principles. It suggests that you are currently exploring your beliefs, seeking deeper meaning, or connecting with a spiritual practice. The Hierophant card encourages you to embrace the wisdom of tradition and seek guidance from trusted sources. It signifies a time of spiritual growth, adherence to moral values, and finding your own spiritual path within established frameworks.',
    futureReading: 'When the Hierophant appears in the future position, it indicates that you will soon enter a phase of further spiritual exploration, seeking guidance, and deepening your understanding of higher truths. This card suggests that in the future, you will have opportunities to connect with your spiritual side, seek guidance from wise sources, or explore your beliefs on a deeper level. The Hierophant card encourages you to embrace the teachings of tradition while remaining open to new insights and interpretations. It promises that the future holds profound spiritual growth and a deeper connection with the divine.',
    pastWeight: 4,
    presentWeight: 3,
    futureWeight: 4,
  },'The Lovers': {
    pastReading: 'The Lovers in the past position suggests that you have experienced a phase of significant choices, partnerships, or relationships. It indicates that in the past, you may have encountered important connections or made decisions that have influenced your life path. The Lovers card signifies a period of deep emotional bonds, harmonious relationships, or transformative choices that have shaped your journey.',
    presentReading: `In the present position, the Lovers represent a phase of love, relationships, and meaningful connections. It suggests that you are currently experiencing or seeking a strong emotional bond with someone or engaging in harmonious partnerships. The Lovers card encourages you to embrace the power of love, make choices that align with your heart's desires, and cultivate authentic connections with others. It signifies a time of emotional fulfillment and the potential for deepening connections.`,
    futureReading: 'When the Lovers card appears in the future position, it indicates that you will soon enter a phase of significant relationships, choices, or partnerships. This card suggests that in the future, you will have opportunities to form meaningful connections or make important decisions that impact your personal or professional life. The Lovers card encourages you to listen to your heart, trust your intuition, and choose what aligns with your values and desires. It promises that the future holds potential for deep love, harmonious relationships, and transformative connections.',
    pastWeight: 5,
    presentWeight: 5,
    futureWeight: 5,
  },'The Emperor': {
    pastReading: 'The Emperor in the past position suggests that you have experienced a phase of establishing order, structure, and taking on a leadership role. It indicates that in the past, you may have embraced your authority, set clear boundaries, and created a solid foundation for yourself or others. The Emperor card signifies a period of discipline, stability, and the successful implementation of your plans.',
    presentReading: 'In the present position, the Emperor represents a phase of leadership, authority, and assertiveness. It suggests that you are currently in a position of power and influence. The Emperor card encourages you to take charge of your life and make decisions with confidence and authority. It signifies a time of establishing boundaries, setting goals, and using your assertiveness to achieve success in your endeavors.',
    futureReading: 'When the Emperor appears in the future position, it indicates that you will soon enter a phase where your leadership qualities and ability to establish structure will be crucial. This card suggests that in the future, you will have opportunities to take charge, provide guidance, and make important decisions. The Emperor card encourages you to embrace your leadership skills, assert your authority when needed, and create a solid foundation for your future endeavors. It promises that by embodying the qualities of the Emperor, you will find success and stability.',
    pastWeight: 4,
    presentWeight: 3,
    futureWeight: 4,
  },'The Chariot': {
    pastReading: 'The Chariot in the past position suggests that you have experienced a phase of determination, willpower, and overcoming challenges. It indicates that in the past, you may have faced obstacles or difficult situations, but you persevered and emerged victorious. The Chariot card signifies a period of inner strength, assertiveness, and the ability to harness your energy to achieve success.',
    presentReading: 'In the present position, the Chariot represents a phase of forward momentum, control, and balance. It suggests that you are currently in a position of taking charge of your life and directing it toward your desired outcomes. The Chariot card encourages you to harness your willpower and use it to overcome obstacles and achieve your goals. It signifies a time of assertiveness, self-discipline, and maintaining a healthy balance between different areas of your life.',
    futureReading: 'When the Chariot appears in the future position, it indicates that you will soon enter a phase of victory, triumph, and the ability to steer your life in the desired direction. This card suggests that in the future, you will have opportunities to take control of your circumstances and navigate through challenges with confidence and determination. The Chariot card encourages you to stay focused, maintain a clear vision of your goals, and trust in your abilities. It promises that the future holds triumph and success as you navigate your path.',
    pastWeight: 4,
    presentWeight: 3,
    futureWeight: 4,
  },'Strength': {
    pastReading: 'The Strength card in the past position suggests that you have experienced a phase of inner strength, courage, and resilience. It indicates that in the past, you may have faced challenges or difficult situations, but you found the inner fortitude to overcome them. The Strength card signifies a period of personal growth, self-belief, and the ability to tame your inner fears or emotions.',
    presentReading: 'In the present position, the Strength card represents a phase of inner power, courage, and overcoming obstacles. It suggests that you are currently drawing upon your inner strength to face challenges and assert yourself. The Strength card encourages you to have confidence in your abilities, trust your instincts, and approach situations with grace and patience. It signifies a time of emotional resilience and the capacity to handle whatever comes your way.',
    futureReading: 'When the Strength card appears in the future position, it indicates that you will soon enter a phase of amplified strength, resilience, and personal empowerment. This card suggests that in the future, you will have opportunities to tap into your inner power and overcome any obstacles that come your way. The Strength card encourages you to stay connected to your inner strength, maintain self-control, and face challenges with compassion and determination. It promises that the future holds a period of triumph and the ability to handle difficult situations with grace.',
    pastWeight: 5,
    presentWeight: 5,
    futureWeight: 5,
  },'The Hermit': {
    pastReading: 'The Hermit in the past position suggests that you have experienced a phase of introspection, solitude, and inner reflection. It indicates that in the past, you may have withdrawn from external influences and embarked on a journey of self-discovery. The Hermit card signifies a period of seeking wisdom, finding answers within, and gaining deeper insights through introspection.',
    presentReading: 'In the present position, the Hermit represents a phase of inner guidance, solitude, and introspection. It suggests that you are currently in a state of self-reflection, seeking solitude to connect with your inner self and gain clarity. The Hermit card encourages you to take time for introspection, meditate, or seek solitude to find answers and guidance within yourself. It signifies a time of spiritual growth, inner wisdom, and deep self-awareness.',
    futureReading: 'When the Hermit appears in the future position, it indicates that you will soon enter a phase of self-reflection, seeking solitude, and inner guidance. This card suggests that in the future, you will have opportunities to withdraw from the noise and distractions of the world to find clarity and answers within. The Hermit card encourages you to trust your inner wisdom, embrace solitude for self-discovery, and seek spiritual guidance. It promises that the future holds a period of profound insight and personal growth through introspection.',
    pastWeight: 2,
    presentWeight: 3,
    futureWeight: 2,
  },'Wheel of Fortune': {
    pastReading: 'The Wheel of Fortune in the past position suggests that you have experienced a phase of significant changes, cycles, and shifts in your life. It indicates that in the past, you may have encountered both fortunate and challenging circumstances that have propelled you forward. The Wheel of Fortune card signifies a period of destiny, karmic influences, and the unfolding of events that have shaped your journey.',
    presentReading: 'In the present position, the Wheel of Fortune represents a phase of change, opportunities, and the turning of the wheel of fate. It suggests that you are currently in a state of transition, where new possibilities and shifts are occurring in your life. The Wheel of Fortune card encourages you to embrace the changes, seize the opportunities that come your way, and trust in the natural flow of life. It signifies a time of luck, destiny, and being open to the ups and downs of the wheel.',
    futureReading: 'When the Wheel of Fortune appears in the future position, it indicates that you will soon enter a phase of significant changes, cycles, and shifts in your life. This card suggests that in the future, you will experience a turning point, where new opportunities and developments will come into play. The Wheel of Fortune card encourages you to remain adaptable, go with the flow, and embrace the unpredictability of life. It promises that the future holds transformative experiences and a shift in your fortunes.',
    pastWeight: 3,
    presentWeight: 4,
    futureWeight: 5,
  },'Justice': {
    pastReading: 'The Justice card in the past position suggests that you have experienced a phase of fairness, balance, and accountability. It indicates that in the past, you may have encountered situations where justice prevailed, or you may have been involved in resolving conflicts or making fair decisions. The Justice card signifies a period of karmic consequences, ethical choices, and the establishment of harmony in your life.',
    presentReading: 'In the present position, the Justice card represents a phase of truth, fairness, and the need for balance. It suggests that you are currently dealing with matters that require careful consideration and impartial judgment. The Justice card encourages you to seek truth, make fair decisions, and weigh all sides of a situation before taking action. It signifies a time of integrity, accountability, and the pursuit of justice in your life.',
    futureReading: 'When the Justice card appears in the future position, it indicates that you will soon enter a phase of justice, fairness, and balance in your life. This card suggests that in the future, you will have opportunities to resolve conflicts, make just decisions, and restore equilibrium in different aspects of your life. The Justice card encourages you to trust in the universal laws of cause and effect, seek fairness in your interactions, and uphold your principles. It promises that the future holds a period of harmony and the manifestation of justice.',
    pastWeight: 3,
    presentWeight: 4,
    futureWeight: 4,
  },'The Hanged Man': {
    pastReading: 'The Hanged Man in the past position suggests that you have experienced a phase of surrender, self-reflection, and letting go. It indicates that in the past, you may have gone through a period of suspended action or sacrificed something in order to gain a new perspective. The Hanged Man card signifies a time of inner transformation, seeing things from a different angle, and embracing patience and acceptance.',
    presentReading: 'In the present position, the Hanged Man represents a phase of surrender, release, and embracing the unknown. It suggests that you are currently in a state of suspension or transition, where you need to let go of control and surrender to the natural flow of life. The Hanged Man card encourages you to find peace in the midst of uncertainty, trust in the process, and allow for a shift in perspective. It signifies a time of spiritual growth, surrendering old patterns, and finding clarity through surrender.',
    futureReading: 'When the Hanged Man appears in the future position, it indicates that you will soon enter a phase of surrender, self-reflection, and a fresh perspective. This card suggests that in the future, you will have opportunities to let go of control and embrace a new way of looking at things. The Hanged Man card encourages you to be open to different viewpoints, surrender to the divine timing, and find wisdom in stillness. It promises that the future holds a period of spiritual enlightenment and a new understanding of your path.',
    pastWeight: -3,
    presentWeight: -4,
    futureWeight: -2,
  },'Death': {
    pastReading: 'When the Death card appears in the past position, it signifies a significant transformation or ending that you have experienced in the past. You may have undergone a profound personal or external change that has brought about the shedding of old patterns, beliefs, or aspects of your life. This card suggests that you have gone through a period of transition and have emerged transformed. Reflecting on this transformative process can provide valuable insights and lessons as you move forward.',
    presentReading: 'In the present position, the Death card indicates that you are currently going through a transformative phase in your life. It represents the need for letting go of the old and making way for the new. You may be experiencing endings, transitions, or releasing outdated aspects of yourself or your circumstances. Embrace this process as an opportunity for growth and renewal. The Death card reminds you to trust the natural cycle of life and allow necessary transformations to occur.',
    futureReading: 'When the Death card appears in the future position, it suggests that significant changes and transformations lie ahead. You may soon encounter a major transition or ending in your life that will pave the way for new beginnings. While change can be unsettling, this card indicates that it is necessary for your growth and evolution. Embrace the process of letting go and trust that these transformations will ultimately lead to positive outcomes and new opportunities.',
    pastWeight: -4,
    presentWeight: -3,
    futureWeight: -2,
  },'Temperance': {
    pastReading: 'The Temperance card in the past position suggests that you have experienced a period of balance, harmony, and moderation in your past. You may have successfully navigated through challenges and found a sense of inner peace and equilibrium. This card indicates that your past actions and decisions were guided by patience, flexibility, and a willingness to find compromises. Reflecting on this period can offer insights into how you can maintain harmony in your present and future endeavors.',
    presentReading: 'In the present position, the Temperance card indicates that you are currently seeking balance and moderation in your life. You may be in a phase of integrating various aspects of yourself or different areas of your life. This card encourages you to approach situations with a calm and patient attitude, avoiding extremes and finding the middle ground. By practicing moderation and adaptability, you can achieve a sense of harmony and inner peace in your present circumstances.',
    futureReading: 'When the Temperance card appears in the future position, it signifies that balance and harmony will play a significant role in your future endeavors. This card suggests that you will encounter situations where finding the right blend of opposing forces will be essential. Embrace a patient and adaptable mindset as you navigate through challenges. By staying grounded, maintaining a moderate approach, and seeking harmony, you can create a positive outcome and cultivate a sense of equilibrium in your future.',
    pastWeight: 4,
    presentWeight: 5,
    futureWeight: 4,
  },'The Devil': {
    pastReading: 'The Devil in the past position suggests that you have experienced a phase of temptation, bondage, or negative patterns in your life. It indicates that in the past, you may have been trapped in unhealthy habits, attachments, or limiting beliefs. The Devil card signifies a period of exploring your shadow side, facing your fears, and learning valuable lessons from challenging experiences.',
    presentReading: 'In the present position, the Devil represents a phase of facing and releasing your personal demons or negative influences. It suggests that you are currently grappling with issues of temptation, addictions, or unhealthy patterns in your life. The Devil card encourages you to confront and challenge these negative forces, break free from bondage, and reclaim your personal power. It signifies a time of self-awareness, liberation, and making conscious choices to overcome destructive patterns.',
    futureReading: 'When the Devil appears in the future position, it indicates that you will soon encounter a phase where you will have to confront your fears, temptations, or negative influences in your life. This card suggests that in the future, you will be presented with opportunities to break free from unhealthy attachments, confront your shadow self, and regain control over your life. The Devil card encourages you to stay vigilant, seek support if needed, and be prepared to face challenges with strength and determination. It promises that the future holds liberation, personal growth, and a chance to create a more positive and empowering path.',
    pastWeight: -5,
    presentWeight: -5,
    futureWeight: -4,
  },'The Tower': {
    pastReading: 'The Tower in the past position suggests that you have experienced a phase of sudden upheaval, destruction, or significant changes in your life. It indicates that in the past, you may have gone through a period of sudden shifts that shook the foundation of your existence. The Tower card signifies a time of releasing old structures, breaking free from limitations, and experiencing a transformative awakening.',
    presentReading: 'In the present position, the Tower represents a phase of sudden change, disruption, or revelations. It suggests that you are currently facing unexpected events or circumstances that are challenging your beliefs and shaking the stability of your life. The Tower card encourages you to embrace these changes as opportunities for growth, release attachments to what no longer serves you, and be open to a new perspective. It signifies a time of breakthroughs, releasing old patterns, and rebuilding your life on a stronger foundation.',
    futureReading: 'When the Tower appears in the future position, it indicates that you will soon enter a phase of sudden change, upheaval, or breakthroughs in your life. This card suggests that in the future, you will experience events or situations that will challenge your existing structures and beliefs. The Tower card encourages you to be prepared for unexpected shifts, trust in the process of transformation, and embrace the opportunity for personal growth. It promises that the future holds a period of liberation, new beginnings, and a chance to rebuild your life in a more authentic way.',
    pastWeight: -5,
    presentWeight: -5,
    futureWeight: -5,
  },'The Star': {
    pastReading: 'The Star in the past position suggests that you have experienced a phase of hope, inspiration, and healing in your life. It indicates that in the past, you may have gone through a period of renewed faith, finding guidance, or experiencing a sense of purpose. The Star card signifies a time of inner healing, connection to your intuition, and aligning with your higher self.',
    presentReading: 'In the present position, the Star represents a phase of hope, inspiration, and guidance. It suggests that you are currently experiencing a renewed sense of optimism and clarity in your life. The Star card encourages you to trust in the universe, follow your dreams, and embrace the divine guidance that is available to you. It signifies a time of spiritual connection, finding your true path, and allowing your inner light to shine.',
    futureReading: 'When the Star appears in the future position, it indicates that you will soon enter a phase of hope, inspiration, and new opportunities in your life. This card suggests that in the future, you will experience a period of increased faith, renewed purpose, and alignment with your higher self. The Star card encourages you to stay open to possibilities, nurture your dreams, and believe in the abundance that awaits you. It promises that the future holds a period of spiritual growth, manifestation of your desires, and a sense of fulfillment.',
    pastWeight: 4,
    presentWeight: 5,
    futureWeight: 5,
  },'The Sun': {
    pastReading: 'The Sun in the past position suggests that you have experienced a phase of joy, success, or newfound confidence in your life. It indicates that in the past, you may have gone through a period of self-discovery, inner radiance, or a time of positive growth. The Sun card signifies a time of optimism, vitality, and embracing your true self.',
    presentReading: 'In the present position, the Sun represents a phase of happiness, fulfillment, and abundance. It suggests that you are currently in a period of shining brightly, feeling confident, and experiencing positive energy in your life. The Sun card encourages you to embrace the present moment, celebrate your achievements, and share your light with others. It signifies a time of vitality, self-expression, and experiencing the fullness of life.',
    futureReading: 'When the Sun appears in the future position, it indicates that you will soon enter a phase of joy, success, and bright opportunities in your life. This card suggests that in the future, you will experience a period of positivity, abundance, and happiness. The Sun card encourages you to remain optimistic, stay connected to your authentic self, and welcome the blessings that come your way. It promises that the future holds a period of flourishing, expansion, and the fulfillment of your desires.',
    pastWeight: 5,
    presentWeight: 5,
    futureWeight: 5,
  },'The Moon': {
    pastReading: 'The Moon in the past position suggests that you have experienced a phase of uncertainty, confusion, or hidden emotions in your life. It indicates that in the past, you may have gone through a period of illusions, subconscious influences, or facing your fears. The Moon card signifies a time of introspection, emotional healing, and navigating through the unknown.',
    presentReading: 'In the present position, the Moon represents a phase of heightened intuition, dreams, and emotional sensitivity. It suggests that you are currently going through a period where things may not be as they seem, and it is important to trust your instincts and listen to your inner voice. The Moon card encourages you to explore your subconscious, pay attention to synchronicities, and embrace the ebb and flow of emotions. It signifies a time of deep introspection, uncovering hidden truths, and using your intuition to guide you.',
    futureReading: 'When the Moon appears in the future position, it indicates that you will soon enter a phase of mystery, intuition, and navigating through the unknown. This card suggests that in the future, you will encounter situations where trusting your intuition and paying attention to subtle signs will be crucial. The Moon card encourages you to embrace the cycles of change, stay connected to your inner wisdom, and have faith in the unfolding of events. It promises that the future holds a period of profound growth, spiritual exploration, and the opportunity to find clarity amidst uncertainty.',
    pastWeight: 1,
    presentWeight: 1,
    futureWeight: 1,
  },'Judgement': {
    pastReading: 'The Judgment card in the past position suggests that you have experienced a phase of self-reflection, inner awakening, or a significant turning point in your life. It indicates that in the past, you may have gone through a period of self-evaluation, releasing old patterns, or making important decisions. The Judgment card signifies a time of spiritual growth, transformation, and embracing a higher calling.',
    presentReading: 'In the present position, the Judgment card represents a phase of self-discovery, accountability, and a call to action. It suggests that you are currently in a period of reassessment, taking responsibility for your choices, and aligning with your true purpose. The Judgment card encourages you to listen to your inner voice, heed the lessons of the past, and make decisions that honor your authentic self. It signifies a time of rebirth, personal transformation, and stepping into your true power.',
    futureReading: 'When the Judgment card appears in the future position, it indicates that you will soon enter a phase of renewal, clarity, and embracing your higher purpose. This card suggests that in the future, you will experience a period of spiritual awakening, making informed choices, and experiencing a sense of inner calling. The Judgment card encourages you to trust in the process of self-discovery, embrace opportunities for growth, and be open to the transformative journey that awaits you. It promises that the future holds a period of liberation, self-acceptance, and living in alignment with your true path.',
    pastWeight: 4,
    presentWeight: 3,
    futureWeight: 4,
  },'The World': {
    pastReading: 'The World card in the past position suggests that you have experienced a phase of completion, fulfillment, or a significant milestone in your life. It indicates that in the past, you may have accomplished a major goal, reached a state of wholeness, or concluded a significant chapter of your journey. The World card signifies a time of integration, success, and the culmination of your efforts.',
    presentReading: 'In the present position, the World represents a phase of expansion, harmony, and embracing your true potential. It suggests that you are currently in a period of wholeness, where all aspects of your life are coming together in a harmonious way. The World card encourages you to celebrate your achievements, embrace new opportunities, and step into your authentic self. It signifies a time of personal growth, embracing your unique gifts, and feeling a sense of fulfillment.',
    futureReading: 'When the World appears in the future position, it indicates that you will soon enter a phase of fulfillment, completion, and new beginnings in your life. This card suggests that in the future, you will experience a period of expansion, where new opportunities and possibilities will present themselves. The World card encourages you to trust in the divine timing of events, remain open to new experiences, and embrace the cycles of life. It promises that the future holds a period of wholeness, fulfillment, and the beginning of a new chapter in your journey.',
    pastWeight: 5,
    presentWeight: 5,
    futureWeight: 5,
  },
}

// Predefined questions to ask the tarot reader
// sources: https://www.cosmopolitan.com/lifestyle/a33470289/tarot-card-questions/
//          https://www.mindbodygreen.com/articles/tarot-questions-to-ask
const predefinedQuestions = [
  'How can I create more balance in my friendships?',
  'What do I need to focus on at my current workplace?',
  'How is my past affecting my present?',
  'Which ideas should I pay attention to today?',
  'What do I need most in my life right now?',
  'What qualities do I need in a partner?',
  'How can I better strengthen my current relationship?',
  'What should I consider when choosing a career path?',
  'What should I appreciate in my life right now?',
  'Where is fear holding me back?'
];

const predefinedQuestionResponses = {
  'How can I create more balance in my friendships?': {
    cautious: "Tread with caution as you navigate the delicate dance of connection. Look within, reflect upon your actions, and communicate openly with your companions. Take heed of boundaries, for they shall guard the equilibrium. Yet remember, each friendship is a unique tapestry, woven with intricate threads. Exercise prudence and remember that harmony blooms through understanding, empathy, and the nurturing of yourself and others.",
    uncertain: "Balance in friendships is veiled in uncertainty, like whispers carried by the wind. Seek not for a definitive answer, for the dynamics of friendships are as enigmatic as the shifting sands. Embrace the journey of self-discovery, and in your quest, tread softly. Nurture your connections with care, be open to growth, and let time unfurl its secrets. The key to balance lies within the ebb and flow, where mysteries intertwine, and destiny weaves its intricate tapestry.",
    neutral: "As you navigate the tapestry of connection, let your intuition be your guide. Embrace harmony by nurturing bonds with an open heart and mindful presence. Seek understanding, for true balance blossoms from mutual respect and genuine communication. Trust the rhythm of time and the symphony of shared experiences, for in this dance, the equilibrium of friendships may find its delicate equilibrium.",
    positive: "The path ahead brims with endless possibilities for harmonious friendships. Embrace candid conversations, for communication shall illuminate your way as a guiding beacon. Embrace empathy and comprehension, allowing benevolence to form the bedrock of your cherished bonds. Through heartfelt gestures and shared moments, you shall weave a tapestry of unity, crafting a melodic symphony of treasured companionship. Embrace this noble pursuit, for within the quest for balance, lies the exquisite beauty of enduring friendships.",
    very_positive: "Radiant soul, the realm of balanced friendships beckons you with shimmering possibilities. With your spirit aflame, let the light of your intentions guide you toward harmony's embrace. Embrace the power within, for you possess the ability to cultivate equilibrium in every connection you cherish. Engage in heartfelt conversations that dance with authenticity, kindling bonds that shall weather the tests of time. Radiate compassion and understanding, nurturing each friendship like a delicate blossom in the garden of your heart. As you traverse this wondrous journey, your friendships will blossom into symphonies of serenity, joy, and lifelong camaraderie."
  },
  'What do I need to focus on at my current workplace?': {
    cautious: "Approach the realm of your work life with attentiveness. As you traverse its intricate landscape, be mindful of the hidden currents and subtle nuances that shape your experience. Keep a discerning eye on the dynamics at play, for they hold the potential for both challenges and opportunities. Focus your energies on the tasks at hand, but remain ever-aware of the ever-changing landscape. With wisdom and careful navigation, you shall navigate the path to success in your professional journey.",
    uncertain: "In your current workplace, dear seeker, the path ahead appears veiled in uncertainty. Embrace the unknown with an open mind and a willingness to adapt. As you navigate this ever-shifting landscape, focus on cultivating a sense of flexibility and resilience. Stay attuned to the subtle cues and changes around you, for they may hold valuable insights. While the specific areas of focus may elude you at this time, by embracing uncertainty, you open yourself up to unexpected opportunities and possibilities that may lead to growth and success in your work.",
    neutral: "It is wise to cultivate a balanced approach at work, where both your core responsibilities and professional growth receive due consideration. Respect the dynamics within your team and the broader organization, as collaboration and effective communication are often key. Additionally, keeping an eye on emerging trends and industry developments can help you remain adaptable and proactive in your role. By maintaining a neutral focus and embracing a well-rounded perspective, you create the potential for both personal and professional advancement in your current workplace.",
    positive: "In your current workplace, dear seeker, a world of possibilities awaits your dedicated gaze. Embrace the power of collaboration, fostering meaningful connections with your colleagues. Cultivate a hunger for growth, seizing every opportunity to expand your skill set and explore new horizons. Stay curious about the ever-evolving landscape of your industry, and let your enthusiasm fuel creative innovation. By channeling your energy into these endeavors, you will illuminate the path to success and fulfillment in your current workplace.",
    very_positive: "The potential that awaits you at your current workplace is vibrant. There are focal points of brilliance awaiting your dedicated attention. Cultivate a spirit of collaboration, intertwining your strengths with those of your colleagues to create a symphony of success. Direct your focus toward professional growth, exploring uncharted territories, and most importantly, expanding your horizons. With an unwavering commitment to excellence, you shall paint a masterpiece of achievements in your current workplace, leaving an indelible mark of distinction."
  },
  'How is my past affecting my present?': {
    cautious: "The whispers of your past cast their shadows upon your present being. Be cautious, for the echoes of those experiences may influence your thoughts, actions, and choices. Take time to reflect upon how your past has shaped your current path, for therein lies valuable wisdom. Yet, do not get caught up in the tendrils of nostalgia or regrets. Instead, embrace the present moment, for it holds the power to shape your future. With mindful awareness and a willingness to embrace new possibilities, you shall understand the connection between your past and present, forging a path towards personal growth and fulfillment.",
    uncertain: "The connection between your past and present creates an air of uncertainty. The influence of your past may subtly shape the path you tread today, yet the intricacies lay in the interconnected nature of complete comprehension. Embrace the enigma with an open mind, for it is through self-reflection and exploration that you may gain windows of insight. The impact of your past upon your present remains a puzzle, which you must put in the time to solve. Trust in your own journey, and may the unfolding future bring clarity and wisdom to illuminate the currently unknown link between your past and present.",
    neutral: "Your past experiences have had a fair impact on shaping your present. They’ve influenced your recent thoughts, beliefs, and behaviors, which in turn has affected your interactions with the world. Positive experiences may provide a strong foundation for confidence and resilience, while negative experiences can create emotional scars and limiting beliefs that hinder personal growth. Understanding the ways in which your past influences your present allows you to reflect on patterns, make conscious choices, and seek healing or personal development where necessary. Ultimately, acknowledging and learning from your past can empower you to create a more fulfilling present and future.",
    positive: "Your experiences are instrumental in shaping your present in great ways. They have equipped you with valuable lessons, resilience, and strength that you can draw upon in your current endeavors. The challenges you have overcome in the past have built your character and prepared you to face new obstacles with confidence and determination. Your past successes and achievements serve as a reminder of your capabilities and provide a solid foundation for future accomplishments. Embracing the lessons and growth from your past empowers you to make informed decisions, pursue meaningful goals, and create a brighter and more fulfilling present.",
    very_positive: "Your past has beautifully paved the way for an incredibly notable present. The meaningful connections you have built and the experiences you have cherished have cultivated a generous collage of fulfillment and happiness in your life. Each success and accomplishment from your past serves as a springboard for even greater achievements and joy in the present. Your past has blessed you with a treasure trove of valuable lessons, resilience, and deep-rooted connections, fueling your current journey towards an even more remarkable and fulfilling future. Embrace the abundant blessings of your past, for they are the foundation of an extraordinary present and an awe-inspiring future."
  },
  'Which ideas should I pay attention to today?': {
    cautious: "In navigating the vast array of ideas presented to you today, it is important to approach them with caution and discernment. Focus on ideas that align with your values, goals, and personal growth. Give attention to concepts supported by reliable evidence and thoughtful reasoning. Be cautious of ideas that lack credibility or show signs of being manipulative or exploitative. Prioritize ideas that promote empathy, inclusivity, and positive impact, while being mindful of potential biases or hidden agendas. Ultimately, exercising critical thinking and careful consideration will help you select ideas that are most beneficial and conducive to your overall well-being.",
    uncertain: "When faced with a multitude of ideas today, it's natural to feel uncertain about which ones to prioritize. Uncertainty can be a sign of open-mindedness and the recognition that not all ideas are equally valid or relevant to your current needs. Embrace this uncertainty as an opportunity for exploration and growth. Consider evaluating ideas based on their potential alignment with your values, personal aspirations, and the insights they offer. Seek a balance between being open to new perspectives and exercising critical thinking to identify ideas that resonate with you on a deeper level. Remember, it's okay to embrace the uncertainty and allow yourself the freedom to discover which ideas truly resonate with you.",
    neutral: "When deciding which ideas to pay attention to today, it is helpful to consider your personal preferences, goals, and priorities. Assess the relevance and potential impact of each idea in relation to your current circumstances. Take into account the sources of the ideas, their credibility, and the evidence or reasoning provided in aligning with each of them. Be open-minded and receptive to a diverse range of ideas while exercising discernment and critical thinking. Ultimately, the ideas that deserve your attention are those that resonate with you and have the potential to contribute positively to your personal or professional journey.",
    positive: "Today offers you an abundance of exciting possibilities to explore and expand your horizons. Embrace this opportunity to delve into ideas that inspire you and align with your passions and aspirations. Pay attention to ideas that ignite your curiosity and have the potential to bring fulfillment and growth into your life. Seek out concepts that resonate deeply with your values, as they can guide you toward making meaningful choices. Give attention to ideas that foster creativity, personal development, and positive impact, allowing you to create a brighter future filled with purpose and joy. Trust in your intuition and follow the path that leads you to the ideas that truly resonate with your authentic self.",
    very_positive: "Today presents you with an extraordinary array of brilliant ideas, each holding immense potential to enrich your life in remarkable ways. Embrace this moment of limitless possibilities and follow the path that excites your imagination and fuels your passions. Pay attention to ideas that ignite a fire within you, resonating deeply with your purpose and dreams. Seek out concepts that challenge you to grow, expand your horizons, and unleash your full potential. Trust in your unique instincts and intuition as you navigate through the sea of ideas, for they will guide you towards the extraordinary opportunities that await. Embrace this wondrous journey of exploration, and let the transformative power of ideas lead you to a future that surpasses your wildest dreams."
  },
  'What do I need most in my life right now?': {
    cautious: "Determining what one needs most in life is a deeply personal and subjective matter. It is important to approach this question with caution, as it depends on your individual circumstances, goals, and values. Taking time for self-reflection and understanding your priorities can provide valuable insights. Consider seeking guidance from trusted individuals who know you well or engaging in practices such as meditation or journaling to gain clarity. Remember that life's needs evolve over time, so regularly reassessing your goals and aspirations can help ensure a balanced and fulfilling journey.",
    uncertain: "Discovering what you need most in your life right now is a complex and uncertain endeavor. It depends on various factors, including your current circumstances, aspirations, and personal growth. Each person's journey is unique, and what may be essential for someone else may not necessarily apply to you. It is crucial to engage in introspection, explore your passions, and seek experiences that align with your values. Embrace the uncertainty and allow yourself the freedom to explore different paths, as it is through exploration that we often discover what we truly need and desire. Remember to be open to change and adapt as your journey unfolds.",
    neutral: "In the vastness of life, discerning what you need most in the present moment is a profound and multifaceted inquiry. I perceive that your journey is unique, and only you possess the intimate knowledge of your desires, aspirations, and circumstances. Engaging in deep self-reflection, introspection, and contemplation may guide you toward the understanding of your current needs. Consider exploring various aspects of your life, such as relationships, personal growth, well-being, and purpose, as they often hold valuable insights. Remember that needs are fluid and dynamic, thus remaining open to new experiences and opportunities can enrich your path towards a more fulfilling existence. Trust in your inner wisdom, embrace the exploration of possibilities, and allow the tapestry of life to unfold with its mysteries and revelations.",
    positive: "From my perspective, I perceive a radiant potential within your life, waiting to unfold. What you need most at this moment is to embrace self-compassion and cultivate a deep sense of self-love. Nurture your inner being with kindness, forgiveness, and acceptance, for it is from this place of self-affirmation that profound growth arises. Connect with your passions and purpose, allowing them to guide your path towards fulfillment and joy. Surround yourself with supportive and uplifting individuals who inspire and encourage your aspirations. Take time for self-care and prioritize your well-being, nurturing your mind, body, and spirit. Trust in the abundance of the universe and have faith in your own resilience, for you possess the innate power to manifest the life you envision.",
    very_positive: "I sense an immense potential and an abundance of blessings waiting to unfold in your life. What you need most in your life right now is a profound awakening to your limitless potential. Embrace boundless self-belief and unshakeable confidence, for you possess the power to manifest your deepest desires. Trust in your inherent wisdom and capabilities, for you are equipped with everything needed to overcome challenges and manifest your dreams. Surround yourself with positive energies, kindred spirits, and uplifting influences that inspire and support your journey. Cultivate gratitude for the present moment, recognizing the beauty and opportunities that surround you. Believe in the limitless possibilities that lie ahead, and embrace the joy and fulfillment that awaits you on your extraordinary path."
  },
  'What qualities do I need in a partner?': {
    cautious: "*No response yet*",
    uncertain: "*No response yet*",
    neutral: "*No response yet*",
    positive: "*No response yet*",
    very_positive: "*No response yet*"
  },
  'How can I better strengthen my current relationship?': {
    cautious: "*No response yet*",
    uncertain: "*No response yet*",
    neutral: "*No response yet*",
    positive: "*No response yet*",
    very_positive: "*No response yet*"
  },
  'What should I consider when choosing a career path?': {
    cautious: "*No response yet*",
    uncertain: "*No response yet*",
    neutral: "*No response yet*",
    positive: "*No response yet*",
    very_positive: "*No response yet*"
  },
  'What should I appreciate in my life right now?': {
    cautious: "*No response yet*",
    uncertain: "*No response yet*",
    neutral: "*No response yet*",
    positive: "*No response yet*",
    very_positive: "*No response yet*"
  },
  'Where is fear holding me back?': {
    cautious: "*No response yet*",
    uncertain: "*No response yet*",
    neutral: "*No response yet*",
    positive: "*No response yet*",
    very_positive: "*No response yet*"
  }
}

/**
 * Sets up the page, adding event listeners and filling the questions list.
 * Called immediately on load of this file.
 */
const init = () => {
  // Add predefined questions to the questions list
  const selectMenu = document.getElementById('question-list');

  for (var i = 0; i < predefinedQuestions.length; i++) {
    var question = document.createElement('option');
    question.text = predefinedQuestions[i];
    selectMenu.add(question);
  }
  //Calling functions when click on button
  document.getElementById('draw-cards').addEventListener('click', () => {
    drawCards();
  });
}
init();

/**
 * Retrieves user's question from the text box
 * @returns {string} The user input text
 * @returns -1 if the user input isn't valid (no selection made)
 */

const getUserInputText = () => {
  // For predefined questions (offline mode)
  const input = document.getElementById(QUESTION_LIST_ID).value;
  // check to see if the current input is the disabled one
  if(input === "") {
    return -1;
  }
  return input;
}

/**
 * @returns {Array} The array of readings from localStorage
 */
const getReadings = () => {
  let readings = localStorage.getItem('readings');
  return readings;
}

/**
 * @param {Array} readings The array of readings to save to localStorage
 */
const saveReadings = (readings) => {
  localStorage.setItem('readings',readings);
}

/**
 * @param {Object} reading The reading to save to localStorage
 */
const saveReading = (reading) => {
  let readings = getReadings();
  readings.push(reading);
  localStorage.setItem('readings',readings);
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
  let readings = getReadings();
  for(let i=0;i<readings.length;i++){
    let reading = readings[i];
    if(reading.id == id){
      return reading;
    }
  }
}

/**
 * @param {string} id The id of the reading to delete
 * @returns {boolean} True if successful, false otherwise
 */
const deleteReading = (id) => {

  return false;
}

/**
 * @returns {boolean} True if any readings deleted, false otherwise
 */
const deleteAllReadings = () => {
  
}

/**
 * Creates a reading object from the user input text
 * @returns {Object} The reading object
 */

const generateReading = () => {
  // const drawnCards = drawCards();

  // let fortune = `Your past card is ${drawnCards[0]}, your present card is ${drawnCards[1]}, and your future card is ${drawnCards[2]}.`;
  // fortune += cardResponseData[drawnCards[0]].pastReading;
  // fortune += cardResponseData[drawnCards[1]].presentReading;
  // fortune += cardResponseData[drawnCards[2]].futureReading;
  // const totalWeight = cardResponseData[drawnCards[0]].pastWeight + cardResponseData[drawnCards[1]].presentWeight + cardResponseData[drawnCards[2]].futureWeight;

  // const inputText = getUserInputText();
  // if(inputText === -1) {
  //   // could alert user of invalid input here
  //   return;
  // }

  // if(totalWeight >= -15 && totalWeight < -9) {
  //   fortune += predefinedQuestionResponses[inputText].cautious;
  // } else if(totalWeight >= -9 && totalWeight < -3) {
  //   fortune += predefinedQuestionResponses[inputText].uncertain;
  // } else if(totalWeight >= -3 && totalWeight < 3) {
  //   fortune += predefinedQuestionResponses[inputText].neutral;
  // } else if(totalWeight >= 3 && totalWeight < 9) {
  //   fortune += predefinedQuestionResponses[inputText].positive;
  // } else {
  //   fortune += predefinedQuestionResponses[inputText].very_positive;
  // }

  // let tarotReading = {
  //   id: Date.now(),       // Unique ID of the reading (Unix Timestamp (ms))
  //   name: "Default",      // Name of the reading
  //   time: Date.now(),     // Time of reading (Unix Timestamp (ms))
  //   cards: drawnCards,    // Names of the cards drawn
  //   fortune: fortune,     // The fortune text
  //   userInput: inputText, // The user input question
  // }
  const tarotReading= 'hello world';
  return tarotReading;
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

/**
 * Chooses 3 cards from the deck
 * @returns {Array} The array of card NAMES
 */
function drawCards() {
  // Get a random number between 0 and the number of cards
  // random select 3 cards no duplicates
  const cardsToDraw = 3;
  const randomIndexes = [];
  while (randomIndexes.length < cardsToDraw) {
    const randomIndex = Math.floor(Math.random() * cards.length);
    if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
    }
  }

  // Get the cards at the random indexes
  const drawnCards = [];
  for (const randomIndex of randomIndexes) {
    drawnCards.push(cards[randomIndex]);
  }

  return drawnCards;
}



// Clear the cards and outputs
document.getElementById('reset').addEventListener('click', () => {
  // Clear the cards
  document.getElementById('draw-cards').disabled = false;
  document.getElementById('cards').innerHTML = '';
  document.getElementById('output-text').innerHTML = '';
  document.getElementById('question-list').innerHTML = '';

  // Only used for Chat GPT version
    // // Added: when reset is hit, input field for question will be cleared
    // document.getElementById('question').value = '';
});

//Generates results onClick
function generate() {
  let image = document.getElementById("display-img");
  image.src = "./images/image1.svg";

  let meaning = document.getElementById("meaning");
  meaning.classList.toggle("show");

  let saveButton = document.getElementById("save");
  saveButton.classList.toggle("show");

  let retryButton = document.getElementById("retry");
  retryButton.classList.toggle("show");

  let dropdownButton = document.querySelector(".dropbtn");
  dropdownButton.style.display = "none";

  const read = generateReading();

  meaning.innerHTML = "";
  meaning.innerHTML += `<p>${read}</p>`;
  meaning.style.display = "block";

}