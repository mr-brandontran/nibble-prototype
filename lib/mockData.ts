export const chartData = [
  { date: 'Mon 1', mood: 7, comfortEats: 1 },
  { date: 'Tue 2', mood: 6, comfortEats: 2 },
  { date: 'Wed 3', mood: 8, comfortEats: 0 },
  { date: 'Thu 4', mood: 5, comfortEats: 3 },
  { date: 'Fri 5', mood: 7, comfortEats: 1 },
  { date: 'Sat 6', mood: 9, comfortEats: 0 },
  { date: 'Sun 7', mood: 4, comfortEats: 4 }, // 'Guilty' shows up most on Sundays
  { date: 'Mon 8', mood: 6, comfortEats: 1 },
  { date: 'Tue 9', mood: 7, comfortEats: 1 },
  { date: 'Wed 10', mood: 8, comfortEats: 0 },
  { date: 'Thu 11', mood: 5, comfortEats: 2 },
  { date: 'Fri 12', mood: 6, comfortEats: 2 },
  { date: 'Sat 13', mood: 8, comfortEats: 1 },
  { date: 'Sun 14', mood: 4, comfortEats: 4 }, // 'Guilty' shows up most on Sundays
];

export const recentMeals = [
  { id: 1, food: 'Greek yogurt with berries', time: '8:30 AM', tags: ['😋 satisfied', '😊 happy'] },
  { id: 2, food: 'Turkey sandwich & chips', time: '12:45 PM', tags: ['😐 neutral'] },
  { id: 3, food: 'Dark chocolate & tea', time: '3:15 PM', tags: ['😊 happy'] },
  { id: 4, food: 'Spicy chicken bowl', time: '7:00 PM', tags: ['😋 satisfied'] },
  { id: 5, food: 'Ice cream pint', time: '10:30 PM', tags: ['😣 guilty', '😴 sluggish'] },
  { id: 6, food: 'Eggs & avocado toast', time: '9:00 AM', tags: ['😊 happy', '🔥 wired'] },
];

export const chatFlows = {
  // Flow A: Fried chicken / guilt
  flowA: {
    triggers: ['fried chicken', 'guilty', 'late', 'stressed'],
    steps: [
      {
        id: 'msg1',
        sender: 'nibble',
        mood: 'concerned',
        text: "Oh — late-night fried chicken after a stressful day. That's such a common combo. Before we figure out what's next, can I ask: how are you feeling **right now**, in your body?",
        options: ['Heavy / sluggish', 'Bloated', 'Just tired', 'Actually okay']
      },
      {
        id: 'msg2',
        sender: 'nibble',
        mood: 'curious',
        text: "Got it. I checked your last few weeks of logs — three of the last four times you had fried food late at night, you wrote that you felt 'wired but exhausted' the next morning. The pattern isn't the chicken, it's the timing + stress combo."
      },
      {
        id: 'msg3',
        sender: 'nibble',
        mood: 'curious',
        text: "For tonight, the most useful thing isn't 'fixing' what you ate. It's setting up tomorrow morning. Want a suggestion?",
        options: ['Yes, suggest something', 'Just log it for now']
      },
      {
        id: 'msg4',
        sender: 'nibble',
        mood: 'happy',
        text: "Tomorrow morning, try something with protein + fiber early — like Greek yogurt with berries, or eggs with avocado toast. Past you logged feeling 'steady' on those mornings. Skip the 'detox' urge — your body wants normalcy, not punishment.",
        isEnd: true,
        logPrefill: 'fried-chicken'
      }
    ]
  },
  // Flow B: Help me pick what to eat
  flowB: {
    triggers: ['pick', 'what to eat', 'fridge'],
    steps: [
      {
        id: 'msg1',
        sender: 'nibble',
        mood: 'curious',
        text: "Tell me two things — what's in your fridge, and what mood are you trying to land in?",
        requireInput: true // UI needs to show two inputs
      },
      {
        id: 'msg2',
        sender: 'nibble',
        mood: 'happy',
        text: "Based on what you have and your past logs, try a quick veggie-and-egg scramble. Last 4 times you ate eggs in the evening, you logged 'calm' or 'satisfied' within 90 min.",
        isEnd: true
      }
    ]
  },
  // Flow C: Stressed, want to eat feelings
  flowC: {
    triggers: ['stressed', 'eat my feelings', 'stress', 'feelings'],
    steps: [
      {
        id: 'msg1',
        sender: 'nibble',
        mood: 'concerned',
        text: "Stress eating isn't a moral failure — it's a signal. Quick check: is it hunger, or is it 'I need a break'?",
        options: ['Real hunger', 'Need a break', 'Honestly not sure']
      },
      {
        id: 'msg2',
        sender: 'nibble',
        mood: 'happy',
        text: "Try 10 minutes away from your screen first. If you still want to eat after, your last 'good break snack' logs were dark chocolate + tea, or apple + peanut butter.",
        isEnd: true
      }
    ]
  }
};
