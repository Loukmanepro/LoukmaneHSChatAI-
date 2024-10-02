// استيراد المكتبات
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // استيراد dotenv لتحميل متغيرات البيئة من ملف .env

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY; // قراءة مفتاح API من متغير البيئة
const API_URL = 'https://api.openai.com/v1/chat/completions'; // عنوان API الخاص بـ OpenAI

// إضافة مسار الجذر
app.get('/api/chat', (req, res) => {
    res.send('Welcome to the AI Chat Server!'); // رسالة ترحيبية
});

// مسار API للرد على الرسائل
app.post('/api/chat', async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(API_URL, {
            model: 'gpt-4', // اختر النموذج المناسب
            messages: [{ role: 'user', content: userMessage }],
        }, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`, // استخدم المفتاح المحفوظ في متغير البيئة
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

// بدء الخادم على المنفذ المحدد
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
