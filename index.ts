npm install express body-parser
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = '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'; // ضع مفتاح API هنا
const API_URL = 'https://api.openai.com/v1/chat/completions'; // عنوان API الخاص بـ OpenAI

// إضافة مسار الجذر
app.get('/api/chat', (req, res) => {
    res.send('Welcome to the AI Chat Server!'); // رسالة ترحيبية
});

app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(API_URL, {
            model: 'gpt-4', // اختر النموذج المناسب
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Authorization': `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`, // استخدم مفتاح API هنا
                'Content-Type': 'application/json',
            },
        });

        const reply = response.data.choices[0].message.content; // استخراج الرد من API
        res.json({ reply });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Something went wrong!' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});