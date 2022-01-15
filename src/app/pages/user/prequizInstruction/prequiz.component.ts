import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-prequiz',
  templateUrl: './prequiz.component.html',
  styleUrls: ['./prequiz.component.css']
})
export class PrequizComponent implements OnInit {
qid
quiz
  constructor(private _route:ActivatedRoute, private _quizserv:QuizService, private _router:Router) { }

  ngOnInit(): void {
  this.qid=  this._route.snapshot.params.qid
    this._quizserv.getQuiz(this.qid).subscribe(
      (data:any)=>{
        // console.log(data);
        this.quiz=data;
      },(error)=>{
        console.log(error);
        alert("Error in loading quiz data")
      }
    )
}
startQuiz()
{
  Swal.fire({
    title: 'Do you want to start the quiz?',
    showCancelButton: true,
    confirmButtonText: 'Start',
    icon:'info',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      this._router.navigate(['/start/'+ this.qid])
    } 
  })
}
}
