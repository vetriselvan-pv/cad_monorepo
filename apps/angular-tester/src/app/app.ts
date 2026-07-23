import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { CadUiAngularButtonComponent, CadUiAngularInputComponent } from '@cad/angular';

@Component({
  imports: [NxWelcome, RouterModule, CadUiAngularButtonComponent, CadUiAngularInputComponent],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'angular-tester';
}
