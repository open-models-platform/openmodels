import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './openmodels.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-user-management';

  session = this.openmodels.session;

  constructor(private readonly openmodels: SupabaseService) {}

  ngOnInit() {
    this.openmodels.authChanges((_, session) => (this.session = session));
  }
}
