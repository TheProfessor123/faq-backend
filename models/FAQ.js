import mongoose from 'mongoose';

const FAQSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  translations: {
    type: Map,
    of: {
      question: { type: String },
      answer: { type: String },
    },
    default: {},
  },
});

FAQSchema.methods.getTranslated = function(lang) {
  const translation = this.translations.get(lang);
  console.log(`Fetching translation for lang: ${lang}`, translation);
  return translation || { question: this.question, answer: this.answer };
};

export default mongoose.model('FAQ', FAQSchema);