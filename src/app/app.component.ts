import {Component, OnInit} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private appContext: AppService, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.appContext.blockUi.subscribe(block => {
      if (block) {
        this.spinner.show();
      } else {
        this.spinner.hide();
      }
    });
  }
}
