import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { environment } from "../../environments/environment";
import { NotificationsService } from "./notifications.service";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private $wsConn: BehaviorSubject<WebSocket> = new BehaviorSubject<WebSocket>(null);

  get wsConn(): WebSocket {
    return this.$wsConn.getValue();
  }

  set wsConn(conn: WebSocket) {
    this.$wsConn.next(conn);
  }

  constructor(
      private notifications: NotificationsService
  ) { }

  openWS(userId: number) {
    if (!!this.wsConn) {
      return;
    }

    if (!userId) {
      return;
    }

    const ws = new WebSocket(`${environment.wsUrl}`);

    ws.onopen = ev => {
      console.log('Successfully opened WebSocket connection');
    };

    ws.onerror = ev => {
      console.log('websocket connection error');
    };

    ws.onclose = ev => {
      console.log('websocket connection is closed');
    };

    ws.onmessage = ev => {
      let data: any;
      try {
        data = JSON.parse(ev.data);
      } catch (e) {
        data = undefined;
      }
      console.log('message: ', data);
      this.notifications.handleWsMessage(data);
    };

    this.wsConn = ws;
  }

}
