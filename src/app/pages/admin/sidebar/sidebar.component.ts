import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private loginserv: LoginService) { }

  ngOnInit(): void {
  }


  public logout() {
    Swal.fire({
      title: 'Are you sure you want to LOGOUT???',
      showCancelButton: true,
      confirmButtonText: 'Logout',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        //calculation
        this.loginserv.logout();
        window.location.reload();
      }
    })
  }
}





