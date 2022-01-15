import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.css']
})
export class ViewQuizesComponent implements OnInit {

  quizzes: any;  
  constructor(private quizServ: QuizService) { }

  ngOnInit(): void {

    this.quizServ.quizzes().subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading data !!', 'error')
      }
    )
  }

  deleteQuiz(qid: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        //delete
        this.quizServ.deleteQuiz(qid).subscribe(
          (data) => {
            this.quizzes = this.quizzes.filter((quiz: any) => quiz.qid != qid);
            Swal.fire('Success', 'Quiz deleted successfully', 'success');
          },
          (error) => {
            Swal.fire('Error', 'Error in deleting quiz', 'error')
          }
        );
      }
    })
  }


}
