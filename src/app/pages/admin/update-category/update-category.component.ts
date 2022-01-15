import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {
  category: any;
  cid: any;

  

  constructor(private _categoryserv:CategoryService, private snak:MatSnackBar,private _route:ActivatedRoute,private _router:Router ) { }

  ngOnInit(): void {
    this.cid = this._route.snapshot.params.cid;
    console.log(this.cid);
    this._categoryserv.getCategoryById(this.cid).subscribe(
      (data)=>{
        //success  
        this.category = data;
         console.log(this.category);
      },
      (error)=>{
        //error
        Swal.fire('Error' , 'Server error while loading data!!' , 'error');
      }
    );

  }
    formSubmit(){
      if(this.category.title.trim()=='' || this.category.title==null){
        this.snak.open("Title Required !!",'',{
          duration:3000
        })
        return;
      }
      // all done
      this._categoryserv.updatingCategory(this.category).subscribe(
  
        (data:any)=>{
          this.category=data
          Swal.fire("Success !!",'category upadate successfully','success').then((e)=>{
            this._router.navigate(["/admin/categories"])
          })
        },
        (error)=>{
          console.log(error);
          Swal.fire("Error !!",'Server error !!','error')
        },
      );
    }
  }


