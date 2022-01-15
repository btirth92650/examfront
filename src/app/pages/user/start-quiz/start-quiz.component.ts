import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { parse } from 'path';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {
  qid: any;
  questions: any

  marksGot = 0
  correctAnswers = 0
  attempted = 0

  isSubmit = false;

  timer: any;

  constructor(private locationSt: LocationStrategy, private _route: ActivatedRoute, private _questionserv: QuestionService) { }

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid)
    this.loadQuestions();
  }

  loadQuestions() {
    this._questionserv.getQuestionQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;
        this.timer = this.questions.length * 2 * 60;
        console.log(data)
        // this.questions.forEach((q) => {
        //   q['givenAnswer'] = '';
        // })
        this.startTimer();
      }, (error) => {
        console.log(error)
        Swal.fire("Error", "Error in loading question of quiz", 'error')
      }
    )
  }

  preventBackButton() {
    history.pushState(null, location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        //calculation
        this.evalQuiz();
      }
    })
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz()
        clearInterval(t)
      } else {
        this.timer--;
      }
    }, 1000)
  }

  getFormattedTime() {
    let mm = Math.floor(this.timer / 60)
    let ss = this.timer - mm * 60;
    return `${mm} min : ${ss} sec`;
  }
  evalQuiz() {
  //   this.isSubmit = true;
  //  call to server to check questions
  this._questionserv.evalQuiz(this.questions).subscribe(
    (data:any)=>{
      console.log(data);
      this.marksGot=parseFloat(Number(data.marksGot).toFixed(2)); 
      this.correctAnswers=data.correctAnswers;
      this.attempted=data.attempted;
      this.isSubmit=true;
    },
    (error)=>{
      console.log(error);
    }
  )
  //   this.questions.forEach(q => {
  //     if (q.givenAnswer == q.answer) {
  //       this.correctAnswers++;
  //       let marksSingle = this.questions[0].quiz.maxMarks / this.questions.length;
  //       this.marksGot += marksSingle;
  //     }
  //     if (q.givenAnswer.trim() != '') {
  //       this.attempted++;
  //     }
  //   });
  //   console.log('Correct Answer :' + this.correctAnswers);
  //   console.log('Marks Got:' + this.marksGot);
  //   console.log('Attempted:' + this.attempted)
  //   console.log(this.questions)

  }

  printPage(){
    window.print();
  }
}
