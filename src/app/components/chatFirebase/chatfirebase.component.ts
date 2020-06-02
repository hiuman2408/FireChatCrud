import { Router } from '@angular/router';
import { ChatServiceService } from 'src/app/services/chat-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-chatfirebase',
  templateUrl: './chatfirebase.component.html',
  styleUrls: ['./chatfirebase.component.css']
})
export class ChatfirebaseComponent implements OnInit {

 

  constructor(private _sc:ChatServiceService,
              private Router:Router) { 


    
  }

  ngOnInit() {

   
  }

}
