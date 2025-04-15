import { Component } from '@angular/core';
import { NavBarComponent } from './core/nav-bar/nav-bar.component';
import { RouterOutlet } from '@angular/router';
import { SectionHeaderComponent } from './core/section-header/section-header.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  imports: [NavBarComponent, RouterOutlet, SectionHeaderComponent, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'EcomClient_Angular19';
}
