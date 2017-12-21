const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
	questionDate: {
		type: Date,
		default: Date.now
	},
	official: {
		type: Boolean,
		default: false,
	},
	showed: {
		type: Boolean,
		default: false,
	},
	answers: [{
		answer: {
			type: String,
		},
		answerDate: {
			type: Date,
			default: Date.now,
		},
		showed: {
			type: Boolean,
			default: false,
		}
	}]
});
QuestionSchema.statics.save = (data,callback) => {
	const question = new Question(data);
	return new Promise((resolved, rejected) => {
		question.save((err, question) => {
			if (err) return rejected(err);
			return resolved(question);
		});	
	});
};

QuestionSchema.statics.addAnswer = (data) => {
	return new Promise((resolved, rejected) => {
		Question.findOne({_id: data.qid}, (err, question) => {
			if (err) return rejected(err);
			if (!question) return rejected(new Error('no question'));
			let answer = {
				answer: data.answer,
				answerDate: Date.now(),
				showed: data.showed,
			};
			question.answers.push(answer);
			question.save((err, question) => {
				if (err) return rejected(err);
				return resolved(question);
			});
		});
	});
};
QuestionSchema.statics.changeShowStatus = (data) => {
	const isQuestion = data.aid == undefined;
	return new Promise((resolved, rejected) => {
		Question.findOne({_id: data.qid}, (err, question) => {
			if (err || !question) return rejected(err);
			if (isQuestion) {
				question.showed ^= 1;
			} else {
				question.answers.forEach((function (answer) {
					if (answer._id == data.aid) {
						answer.showed ^= 1;
					}
				}));
			}
			question.save((err, question) => {
				if (err) return rejected(err);
				return resolved(question);
			});
		});
	});
};

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;
