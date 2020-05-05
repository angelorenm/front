import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { GLOBAL } from "../../services/GLOBAL";

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css']
})
export class MessengerComponent implements OnInit {

  public usuarios;
  public url;

  constructor(
      private _userService : UserService,

  ) {
    this.url  = GLOBAL.url;
   }

  ngOnInit() {
    this._userService.get_users().subscribe(
      response=>{
        this.usuarios = response.users; 
        
        //console.log(response);
      },
      error =>{

      }
    );


  }

}
