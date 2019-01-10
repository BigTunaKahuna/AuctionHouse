import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { Message } from './message.model';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private connection: signalR.HubConnection;
  message = new Subject<Message>();

  connect(token) {
    if (!this.connection) {
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl("/chathub", { accessTokenFactory: () => token })
        .configureLogging(signalR.LogLevel.Information)
        .build();

      this.connection.on("receive", (user, content) => {
        this.message.next({ user, content });
      });

      this.connection.start().catch(err => console.error(err));
    }
  }

  send(message) {
    this.connection.invoke("SendMessage", message).catch(err => console.error(err));
  }

  disconnect() {
    if (this.connection) {
    this.connection.stop();
      this.connection = null;
    }
  }

}
