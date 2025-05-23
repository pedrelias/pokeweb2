import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AuthenticatorComponent } from '../../tools/authenticator/authenticator.component';


@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  onGetStartedClick(){
    this.loginSheet.open(AuthenticatorComponent);
  }
}