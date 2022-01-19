import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import { QuizService } from 'src/app/services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {

  categories!:any []

  quizData={
     
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:'true',
    category:{
      cid:''
    },
  }
  
  constructor(private _catsev:CategoryService,private snak:MatSnackBar, private _quiz:QuizService,private _router:Router) { }

  ngOnInit(): void {

    this._catsev.categories().subscribe(
      (data:any)=>{
        // category load
        this.categories = data;
        //console.log(this.categories)
      },
      (error)=>{
         console.log(error)
         Swal.fire('Error','error in loading data from server','error')
      }
    );
  }

  addQuiz()
  {
    if(this.quizData.title.trim()=='' || this.quizData.title==null){
      this.snak.open("Title Required !!",'',{
        duration:3000
      })
      return;
    }
    this._quiz.addQuiz(this.quizData).subscribe(

      (data:any)=>{
        
        Swal.fire("Success !!",'quiz added successfully','success').then((e)=>{
          this._router.navigate(['/admin/quizzes'])
        })
        this.quizData={
     
          title:'',
          description:'',
          maxMarks:'',
          numberOfQuestions:'',
          active:'true',
          category:{
            cid:'',
          },
        } 
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !!",'Server error !!','error')
      },
    );
  }
}
