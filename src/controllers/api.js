const express = require('express');
const router = express.Router();

const Question = require('../model/question');

router.get('/questions', getQuestions);
router.post('/questions', postQuestions);
router.post('/answers', postAnswers);
router.put('/change-show-status', changeShowStatus);
module.exports = router;

function getQuestions(req, res, next) {
	const current = req.query.page || 1;
	const isAdmin = req.query.type == 'admin';
	const perpage = isAdmin ? 20 : 10;
	const conditions = isAdmin ? {} : {showed: true};
	const Options = {
		sort: {questionDate: -1},
		skip: perpage*(current-1),
		limit: perpage,
	};
	Question.find(conditions, {}, Options, (err, questions) => {
		  	if (err) return next(err);
		  	questions = formatQuestions(questions, isAdmin);
		  	Question.count(conditions, (err, numbeconsolers) => {
		  		let data = {
			  		questions: questions,
			  		page: {
			  			count: Math.ceil(numbers/perpage),
			  			current: current
			  		}
		  		};
		  		res.send(data);
		  		res.end();	
			})
		}
    );
}

function postQuestions(req, res, next) {
	let data = {};
	data.question = req.body.question;
	data.official = req.body.official;
	data.answers = [];
	if (req.body.official) {
		data.showed = true;
		let answer = {};
		answer.answer = req.body.answer;
		answer.showed = true;
		data.answers.push(answer);
	}
	Question.save(data)
		.then((question) => {res.send({succ: true}); return res.end()})
		.catch((err) => {res.send({succ: false}); return res.end()});
}

function postAnswers(req, res, next) {
	Question.addAnswer(req.body)
		.then((answer) => { res.send({succ: true}); return res.end();})
		.catch((err) => {res.send({succ: false}); return res.end()});
}

function changeShowStatus(req, res, next) {
	Question.changeShowStatus(req.query)
		.then((question) => {res.send({succ: true});res.end()})
		.catch((err) => {res.send({succ: false});res.end()});
}



function formatQuestions(questions, isAdmin) {
	let fquestions = [];
	questions.forEach((question) => {
		if (isAdmin || question.showed == true) {
			let fquestion = {};
			fquestion.qid = question._id;
			fquestion.question = question.question;
			fquestion.questionDate = question.questionDate;
			fquestion.official = question.official;
			fquestion.answers = [];
			question.answers.forEach((answer) => {
				if (isAdmin || answer.showed == true) {
					let fanswer = {};
					fanswer.aid = answer._id;
					fanswer.answer = answer.answer;
					fanswer.answerDate = answer.answerDate;
					if (isAdmin) {
						fanswer.showed = answer.showed;
					}
					fquestion.answers.push(fanswer);
				}
			})
			if (isAdmin) {
				fquestion.showed = question.showed;
			}
			fquestions.push(fquestion);
		}
	})
	return fquestions;
}