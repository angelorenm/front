import { Component, OnInit } from '@angular/core';
import { User } from  "../../models/User";
import { UserService} from '../../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user;
  public token;
  public identity;
  public data_user;


  constructor(
    private _userService : UserService,
    private _router: Router,

  ) { 
    this.data_user =  this._userService.getIdentity();
  }

  ngOnInit(): void {
    this.user = new User('','','','','','','','','',false );
    if(this.data_user){
      this._router.navigate(['messenger']);
    }
  }

  onSubmit(loginForm){
    //console.log(loginForm.value);
    
    if(loginForm.valid){
      this._userService.login(this.user).subscribe(
        response =>{
          //console.log(response);
         
           this.token = response.jwt;
           this.identity = JSON.stringify(response.user);
           localStorage.setItem('token',this.token);

           this._userService.login(this.user,true).subscribe(
            response =>{
              localStorage.setItem('identity',this.identity);
              this._router.navigate(['messenger']);
              //console.log(response);
            },
            error=>{

            }
            
           );

          },
          error =>{

          }
      )
     }else{
      console.log("No se pudo enviar");

     }

  }

}
