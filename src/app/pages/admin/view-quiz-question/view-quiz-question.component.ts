import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {
  quesId
  qtitle
  questions

  constructor(private _route: ActivatedRoute, private _question:QuestionService, private _snak:MatSnackBar) { }

  ngOnInit(): void {
    this.quesId=this._route.snapshot.params.quesId;
    this.qtitle=this._route.snapshot.params.title;
    this._question.getQuestionQuiz(this.quesId).subscribe(
      (data)=>{
        console.log(data)
        this.questions=data;
      },(error)=>{
        console.log(error)
      }
    )
  }
  //delete question 
  deleteQuestion(quesId){
    Swal.fire({
      icon:'info',
      title:'are you sure, you want to delete this question',
      confirmButtonText:'Delete',
      showConfirmButton:true,
      showCancelButton:true,
    }).then((result)=>{
      if(result.isConfirmed){
        //delete
        this._question.deleteQuestion(quesId).subscribe(
          (data:any)=>{
            this._snak.open('Question Deleted','',{
              duration:3000,
            })
            this.questions=this.questions.filter((q)=> q.quesId != quesId)
          },(error)=>{
            this._snak.open('Question Deleted','',{
              duration:3000,
            })
          }
        )
      }
    })

    
  }

}
