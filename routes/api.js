"use strict";

const Translator = require("../components/translator.js");

module.exports = function (app) {
    const translator = new Translator();

    app.route("/api/translate").post((req, res) => {
        const { text, locale } = req.body;
        const translation = translator.translate(text, locale);
        if (text === undefined || !locale) {
            return res.json({ error: "Required field(s) missing" });
        } else if (text === "") {
            return res.json({ error: "No text to translate" });
        } else if (
            locale !== "american-to-british" &&
            locale !== "british-to-american"
        ) {
            return res.json({ error: "Invalid value for locale field" });
        } else if (translation === text) {
            return res.json({
                text,
                translation: "Everything looks good to me!",
            });
        } else {
            return res.json({ text, translation });
        }
    });
};
