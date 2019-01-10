import { Message } from './message.model';
import { MessageService } from './message.service';
import { AuthService } from './auth.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription, Subscribable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  messages: Message[] = [];
  notificationSubscription: Subscription;

  messageForm = this.fb.group({
    message: ['Hello World!', Validators.required]
  })

  loginForm = this.fb.group({
    username: ['alice', Validators.required],
    password: ['password', Validators.required]
  });
  display: boolean;
  loginSubscription: Subscription;

  constructor(private notification: MessageService, private fb:FormBuilder, private auth:AuthService) { }

  onSubmit() {
    this.notification.send(this.messageForm.getRawValue().message);
  }

  logIn() {
    const value = this.loginForm.getRawValue();

    if (!!this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }

    this.loginSubscription = this.auth.login(value.username, value.password)
      .subscribe(token => {
        this.notification.connect(token);
        this.display = false;
      })
    
  }

  ngOnInit() {
    this.notificationSubscription = this.notification.message.subscribe(msg => {
      this.messages.push(msg);
    });
    this.display = true;
  }
}
