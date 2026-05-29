require('dotenv').config({ path: '.env' });
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/recipes', async (req, res) => {
  try {
    const { ingredients } = req.body;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `I have these ingredients in my pantry: ${ingredients}. Respond ONLY with a valid JSON object, no markdown, no extra text. Format: {"recipes": [{"title": "Recipe Name", "description": "Two sentence description.", "prepTime": "15 minutes"}]}. Give 3 recipes.`
            }]
          }]
        })
      }
    );
    const data = await response.json();
    if (data.error) return res.status(500).json({ error: data.error.message });
    const text = data.candidates[0].content.parts[0].text;
    res.json({ recipes: text });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));

