import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {
  title: string = '';

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected: string = '';

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  optionsSelected: any;



  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex].question;

      this.questionMaxIndex = this.questions.length;

      this.optionsSelected = this.questions[this.questionIndex].options;
    }
  }

  playChoose(value: string) {
    this.answers.push(value);
    this.nextSetp()
    console.log(value);
  }

  async nextSetp() {
    this.questionIndex++;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex].question;
      this.optionsSelected = this.questions[this.questionIndex].options;
    } else {

      console.log(this.answers)
      const finalAnswer = await this.checkResult(this.answers);

      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
      console.log(this.answerSelected);
    }
  }





  checkResult(anwers: string[]) {
    const result = anwers.reduce((previous, current, i, arr) => {
      if (
        arr.filter(item => item === previous).length >
        arr.filter(item => item === current).length
      ) {
        return previous;
      } else {
        return current;
      }
    })
    return result
  }

}
