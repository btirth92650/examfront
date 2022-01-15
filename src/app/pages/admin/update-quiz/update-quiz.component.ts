import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';   
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css']
})
export class UpdateQuizComponent implements OnInit {
  quiz: any 
  categories:any 
  constructor(private _route:ActivatedRoute,private _quiz:QuizService, private _catserv:CategoryService, private _router:Router ) { }

  qid = 0;
  ngOnInit(): void {
    this.qid = this._route.snapshot.params.qid;
    //alert(this.qid)
    //console.log(this.qid)
    this._quiz.getQuiz(this.qid).subscribe(
      (data:any)=>{
        this.quiz=data;
        console.log(this.quiz);
      },
      (error)=>{
        console.log(error);
      }
    );
    this._catserv.categories().subscribe(
      (data:any)=>{
        this.categories = data;
      },
       (error)=>{
        alert('error in loading category')
      }
    )
     }
    //update form submit
    public updateData()
    {
      // validated

      this._quiz.updateQuiz(this.quiz).subscribe(
        (data:any)=>{
          Swal.fire('Success !','Quiz updated succesfully','success').then((e)=>{
            this._router.navigate(['/admin/quizzes'])
          })
        },(error)=>{
          Swal.fire('Error','error in updated quiz','error')
          console.log(error)
        }
      )
    }
  }

