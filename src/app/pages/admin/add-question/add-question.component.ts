import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor
 
  qid
  qtitle

  question={
    quiz:{},
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
  }

  constructor(private _route:ActivatedRoute, private _questionserv:QuestionService) { }

  ngOnInit(): void {

   this.qid= this._route.snapshot.params.qid;
   this.qtitle= this._route.snapshot.params.title;

   this.question.quiz['qid'] =this.qid  
   
  }
  formSubmit()
  {
   if(this.question.content.trim() == '' || this.question.content == null){
     return; 
   }

   if(this.question.option1.trim() == '' || this.question.option1 == null){
     return;
   }

    if(this.question.option2.trim() == '' || this.question.option2 == null){
      return;
    }

    if(this.question.answer.trim() == '' || this.question.answer == null){
      return;
    }

   // form submit
   this._questionserv.addQuestion(this.question).subscribe(
     (data:any) =>{
       Swal.fire('Success','question added.add oneother one','success' )
       this.question.content='';
       this.question.option1='';
       this.question.option2='';
       this.question.option3='';
       this.question.option4='';
       this.question.answer=''; 

     },(error) =>{
      Swal.fire('Error','error in adding question ','error' )
     }
   )
  }
}
  