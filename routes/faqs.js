import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
const router = express.Router();
import FAQ from '../models/FAQ.js';
import { translate } from '@vitalets/google-translate-api';
import redisClient from '../redisClient.js';

router.post('/', async (req, res) => {
  const { question, answer, lang } = req.body;
  const faq = new FAQ({ question, answer });

  if (lang && lang !== 'en') {
    try {
      const translatedQuestion = await translate(question, { to: lang });
      const translatedAnswer = await translate(answer, { to: lang });
      faq.translations.set(lang, {
        question: translatedQuestion.text,
        answer: translatedAnswer.text,
      });

      const cacheKey = `faqs_${lang}`;
      await redisClient.del(cacheKey);
    } catch (error) {
      console.error('Translation error:', error);
      faq.translations.set(lang, { question, answer });
    }
  }

  await faq.save();
  res.status(201).json(faq);
});

router.get('/', async (req, res) => {
  const lang = req.query.lang || 'en';
  const cacheKey = `faqs_${lang}`;

  try {
    const faqs = await FAQ.find();
    const response = faqs.map(faq => faq.getTranslated(lang));
    await redisClient.set(cacheKey, JSON.stringify(response));
    res.json(response);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;