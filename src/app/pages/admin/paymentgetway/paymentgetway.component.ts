import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';


declare var Razorpay: any;


@Component({
  selector: 'app-paymentgetway',
  templateUrl: './paymentgetway.component.html',
  styleUrls: ['./paymentgetway.component.css']
})
export class PaymentgetwayComponent implements OnInit {
  payment: any = {
    amount: '',
  }

  constructor(private userSer: UserService) { }

  ngOnInit(): void {   }


  paymentStart() {
    if(this.payment.amount == '' || this.payment.amount == null){
      alert("amount can not be blank");
      return;
    }
    this.userSer.generateOrder(this.payment).subscribe(
      (data:any)=>{
        //success
        console.log("data sent....");

        console.log(data);
        if(data.status == 'created'){
          //then we call form of razorpay
          let options = {
            key:'rzp_test_kcY7ymrYYMfmyA',
            amount:data.amount,
            currency:'INR',
            name: 'Donation',
            description: 'Donation Payment',
            image:'../../../../assets/credit.png',
            order_id:data.id,
            handler:function(response){
              console.log(response.razorpay_payment_id);
              console.log(response.razorpay_order_id);
              console.log(response.razorpay_signature);
              console.log(response);

              // When status created updatingServer
              // updatingServer(response,'Paid');

              alert(" congrets payment successfully !!");
            },
    
            prefill: {
              name: '',
              email: '',
              contact: '',
          },
          notes:{
              address:'welcome this is payment integretion demo',
          },

          theme:{
            color:'#3399cc',
          },

          };

          //object of razorpay_payment_id
          let rzp = new Razorpay(options);

          //when payment failed
          rzp.on('payment.failed', function (response:any){
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            alert("payment failed");
          });
          rzp.open();
        }
      },
      (error:any)=>{
        // Error
        console.log(error);
      });
  }

  }


