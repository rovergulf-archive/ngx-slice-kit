import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { User } from "../../tools/model";
import { ApiService } from "./api.service";
import { SocketService } from "./socket.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    returnUrl: string;
    private $currentUser: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
    private $session: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
    private $isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private authorizationConfirmed$ = new Subject<boolean>();
    private logoutConfirmed$ = new Subject<boolean>();

    private authorizing: boolean;
    private simpleAuth: boolean;

    constructor(
        private api: ApiService,
        private socket: SocketService
    ) {
    }

    get isLoggedIn(): boolean {
        return this.$isLoggedIn.getValue();
    }

    set isLoggedIn(bool: boolean) {
        this.$isLoggedIn.next(bool);
    }

    get authorizationConfirmed(): Observable<boolean> {
        return this.authorizationConfirmed$.asObservable();
    }

    get logoutConfirmed(): Observable<boolean> {
        return this.logoutConfirmed$.asObservable();
    }

    get sessionId(): string {
        return this.$session.getValue();
    }

    set sessionId(session: string) {
        this.$session.next(session);
    }

    get currentUser(): User {
        return this.$currentUser.getValue();
    }

    set currentUser(user: User) {
        this.$currentUser.next(user);
    }

    get currentUserId(): number {
        return this.$currentUser.getValue().user_id;
    }

    enableSimpleAuthorization(): void {
        this.simpleAuth = true;
    }

    setAuthorized(): void {
        if (this.authorizing) {
            return;
        }
        this.authorizing = true;

        this.api.get(`${this.simpleAuth ? 'auth' : 'workspace'}/profile`).subscribe(
            res => {
                const {user, workspaces, settings} = res;
                this.currentUser = new User({
                    ...user,
                    workspaces,
                    settings
                });
                this.isLoggedIn = true;
                this.authorizationConfirmed$.next(true);
                this.socket.openWS(this.currentUserId);
                this.authorizing = false;
            },
            err => {
                this.authorizationConfirmed$.next(false);
                this.authorizing = false;
                console.log('Failed to authenticate: ', err.error.message || err.error);
            }
        );
    }

    logout(): void {
        this.api.get(`auth/logout`).subscribe(
            ok => {
                if (ok) {
                    this.currentUser = undefined;
                    this.sessionId = undefined;
                    this.isLoggedIn = false;
                    this.logoutConfirmed$.next(true);
                    this.authorizationConfirmed$.next(false);
                    console.log('Successfully logged out');
                }
            },
            err => {
                console.log('Unable to log out');
                this.logoutConfirmed$.next(false);
            }
        );
    }

    isYou(user_id: number): boolean {
        return user_id === this.currentUserId;
    }

}
