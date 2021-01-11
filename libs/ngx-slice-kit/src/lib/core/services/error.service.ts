import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { AUTH_ERRORS, CONTROL_ERRORS, RAPID_ERRORS, USER_ERRORS, WORKSPACE_ERRORS } from "../../tools/errors";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private $errors: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor() {
  }

  getControlError(errors: any): string {
    for (let key in errors) {
      if (errors.hasOwnProperty(key)) {
        if (CONTROL_ERRORS.hasOwnProperty(key)) {
          return CONTROL_ERRORS[key];
        }
      }
    }

    return undefined;
  }

  handleAuthError(route: string, err: any): { control: string, value: string } {
    const code = err.error?.code ?? err.code ?? err.statusCode;
    const routeErrors = AUTH_ERRORS[route];
    if (routeErrors.hasOwnProperty(code)) {
      const {control, value} = routeErrors[code];
      return {control, value};
    }

    return undefined;
  }

  handleUserErrors(route: string, err: any): any {
  }

  handleWorkspaceErrors(route: string, err: any): { control: string, value: string } {
    const code = err.error?.code ?? err.code ?? err.statusCode;
    const routeErrors = WORKSPACE_ERRORS[route];
    if (routeErrors.hasOwnProperty(code)) {
      const {control, value} = routeErrors[code];
      return {control, value};
    }

    return undefined;
  }

  handleRapidErrors(route: string, err: any): { control: string, value: string } {
    const code = err.error?.code ?? err.code ?? err.statusCode;
    const routeErrors = RAPID_ERRORS[route];
    if (routeErrors.hasOwnProperty(code)) {
      const {control, value} = routeErrors[code];
      return {control, value};
    }

    return undefined;
  }

  handleThingsErrors(route: string, err: any): void {
  }
}
