var React = require('react');
var _ = require('lodash');
var ShowAddButton = require('../components/ShowAddButton');
var QuestionForm = require('../components/QuestionForm');
var QuestionList = require('./QuestionList');

module.exports = React.createClass({
	getInitialState:function(){
		var questions = [
			{
			id:1,
			title:'女生适合做程序员吗？',
			description:'比较心理不是程序媛专利，程序猿（男性程序员）也会有。这是不可回避的，我们只要把它看作是不断成长进步的动力就好了，毕竟每个人都有自己的长处和短板，只拿某一个点来衡量是很不公平的，你只要在比较中看清自己的不足从而督促自己改善即可，任何因为比较而产生的放弃情绪都是不可取的。',
			voteCount:16
  		},
  		{
  			id:2,
  			title:'有一个代码大神男朋友是一种怎样的体验？',
  			description:'就好像偶像在身边一样，看他专注着看着电脑，手指快速敲打键盘，整个人像是在发光一样。（好吧，单身狗在意淫）',
  			voteCount:12
  		}
		];

		return {
			questions : questions,
			formDisplay:false
		}
	},
	onToggleForm : function(){
		this.setState({
			formDisplay:!this.state.formDisplay
		})
	},
	onNewQuestion : function(newQuestion){
		newQuestion.id = this.state.questions.length + 1;

		var newQuestions = this.state.questions.concat( newQuestion );

		newQuestions = this.sortQuestion( newQuestions );

		this.setState({
			questions: newQuestions,
		});
	},
	onVote:function(key,newCount){
		var questions = _.uniq(this.state.questions);
		var index = _.findIndex(questions,function(q){
			return q.id == key;
		});

		questions[index].voteCount = newCount;

		questions = this.sortQuestion( questions );

		this.setState({
			questions: questions,
		});

	},
	sortQuestion:function(questions){
		questions.sort(function(a,b){
			return b.voteCount - a.voteCount
		});
		return questions
	},
	render:function(){
		return (
			<div>
			  <div className="jumbotron text-center">
		          <div className="container">
		            <h1>React问答</h1>
		            <ShowAddButton onToggleForm={this.onToggleForm} />
		          </div>
		      </div>
		      <div className="main container">
		        <QuestionForm
		        	onNewQuestion={this.onNewQuestion}
		        	formDisplay={this.state.formDisplay}
		        	onToggleForm={this.onToggleForm} />
		        <QuestionList
		        	questions={ this.state.questions }
		        	onVote={this.onVote} />
		      </div>
			</div>
		)
	}
})
