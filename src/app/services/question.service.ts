import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private _http:HttpClient) { }

  public getQuestionQuiz(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/all/${qid}`)
  }

  public getQuestionQuizForTest(qid:any){
    return this._http.get(`${baseUrl}/question/quiz/${qid}`)
  }

  //add question
  public addQuestion(question){
    return this._http.post(`${baseUrl}/question/`,question)
  }
  // delete question
  public deleteQuestion(questionId){
    return this._http.delete(`${baseUrl}/question/${questionId}`)
  }
  //eval quiz
  public evalQuiz(question)
  {
    return this._http.post(`${baseUrl}/question/eval-quiz`,question)
  }

  //update Question
  public updateQuestion(question)
  {
    return this._http.put(`${baseUrl}/question/`,question)
  }
  //get single question
  public getQuestionById(quesId)
  {
    return this._http.get(`${baseUrl}/question/${quesId}`)
  }
}
