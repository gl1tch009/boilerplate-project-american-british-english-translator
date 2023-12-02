const americanOnly = require("./american-only.js");
const americanToBritishSpelling = require("./american-to-british-spelling.js");
const americanToBritishTitles = require("./american-to-british-titles.js");
const britishOnly = require("./british-only.js");

class Translator {
    constructor() {
        this.americanOnly = americanOnly;
        this.americanToBritishSpelling = americanToBritishSpelling;
        this.americanToBritishTitles = americanToBritishTitles;
        this.britishOnly = britishOnly;
    }

    translate(text, locale) {
        let translatedText = text;

        if (locale === "american-to-british") {
            translatedText = this.translateAmericanToBritish(text);
        } else if (locale === "british-to-american") {
            translatedText = this.translateBritishToAmerican(text);
        }

        return translatedText;
    }

    translateAmericanToBritish(text) {
        let translatedText = text;

        if (!text) return;

        // Translate American to British spelling
        for (let key in this.americanToBritishSpelling) {
            const regex = new RegExp(`\\b${key}\\b`, "gi");
            const replacement = this.americanToBritishSpelling[key];
            translatedText = translatedText.replace(regex, replacement);
        }

        // Translate American to British titles
        for (let key in this.americanToBritishTitles) {
            const regex = new RegExp(`\\b${key}.\\b`, "gi");
            const replacement = this.americanToBritishTitles[key];
            translatedText = translatedText.replace(
                regex,
                `${replacement.charAt(0).toUpperCase() + replacement.slice(1)} `
            );
        }

        // Translate time
        const timeRegex = /([0-9]{1,2}):([0-9]{2})/g;
        const timeReplacement = "$1.$2";
        translatedText = translatedText.replace(timeRegex, timeReplacement);

        // Translate American to British words
        for (let key in this.americanOnly) {
            const regex = new RegExp(`\\b${key}\\b`, "gi");
            const replacement = this.americanOnly[key];
            translatedText = translatedText.replace(regex, replacement);
        }

        // Add highlight to translated text
        const translatedWords = translatedText.split(" ");
        const originalWords = text.split(" ");
        const highlightedWords = [];

        for (let i = 0; i < translatedWords.length; i++) {
            if (translatedWords[i] !== originalWords[i]) {
                highlightedWords.push(
                    `<span class="highlight">${translatedWords[i]}</span>`
                );
            } else {
                highlightedWords.push(translatedWords[i]);
            }
        }

        translatedText = highlightedWords.join(" ");

        return translatedText;
    }

    translateBritishToAmerican(text) {
        let translatedText = text;

        if (!text) return;

        // Translate British to American spelling
        for (let key in this.britishOnly) {
            const regex = new RegExp(`\\b${key}\\b`, "gi");
            const replacement = this.britishOnly[key];
            translatedText = translatedText.replace(regex, replacement);
        }

        // Translate British to American titles
        for (let key in this.americanToBritishTitles) {
            const regex = new RegExp(
                `\\b${this.americanToBritishTitles[key]}\\b`,
                "gi"
            );
            const replacement = key;
            translatedText = translatedText.replace(
                regex,
                `${replacement.charAt(0).toUpperCase() + replacement.slice(1)}`
            );
        }

        // Translate time
        const timeRegex = /([0-9]{1,2}).([0-9]{2})/g;
        const timeReplacement = "$1:$2";
        translatedText = translatedText.replace(timeRegex, timeReplacement);

        // Translate British to American words
        for (let key in this.americanToBritishSpelling) {
            const regex = new RegExp(
                `\\b${this.americanToBritishSpelling[key]}\\b`,
                "gi"
            );
            const replacement = key;
            translatedText = translatedText.replace(regex, replacement);
        }

        // Add highlight to translated text
        const translatedWords = translatedText.split(" ");
        const originalWords = text.split(" ");
        const highlightedWords = [];

        for (let i = 0; i < translatedWords.length; i++) {
            if (translatedWords[i] !== originalWords[i]) {
                highlightedWords.push(
                    `<span class="highlight">${translatedWords[i]}</span>`
                );
            } else {
                highlightedWords.push(translatedWords[i]);
            }
        }

        translatedText = highlightedWords.join(" ");

        return translatedText;
    }
}

module.exports = Translator;
