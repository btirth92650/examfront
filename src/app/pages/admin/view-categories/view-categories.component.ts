import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories:any
  
  constructor( private categoryser:CategoryService) { }

  ngOnInit(): void {

    this.categoryser.categories().subscribe((data:any)=>{
      this.categories = data;
      console.log(this.categories);
      
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!",'error in loading data','error')
    });
}

  // deleteCategory(categories: any){
  //   this.categoryser.deleteCategory(categories).subscribe((result)=>{
  //     console.log("category is deleted Succesfully !!",result)
  //     console.warn(this.categories)
  //   })

  // }

  deleteCategory(categories:any){
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {

      if (result.isConfirmed) {

        //delete here
        this.categoryser.deleteCategory(categories).subscribe(
          (data) => {
            //quiz filter after deleting
            this.categories = this.categories = this.categories.filter((category  :any) => category.cid != categories);
            // console.log(cid);
            // console.log(this.categories);
            //success
            Swal.fire('Success', 'Category deleted!!', 'success');
          },
          (error) => {
            //error
            Swal.fire('Error', 'Error in deleting Category', 'error');
          },
        );

      }
    });

  }

  }
