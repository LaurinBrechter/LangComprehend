const { Text: TextModel } = require('../models/c_text');

const textController = {

    create: async (req, res) => {
        try {

            const service = {
               text: req.body.text, 
               n_questions: req.body.n_questions,
               language: req.body.language,
               url: req.body.url,
               questions: req.body.questions,
               answers: req.body.answers,
               vocab: req.body.vocab,
               topics: req.body.topics,
               entities: req.body.entities 
            }

            const response = await TextModel.create(service);

            res.status(201).json({response, msg: "Text created successfully"});

        } catch (error) {
            console.error(error);
        }
    }


};

module.exports = textController;