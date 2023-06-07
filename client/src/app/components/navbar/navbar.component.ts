import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent {
  scrolledPercentage: number = 0;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    this.scrolledPercentage = (scrollTop / (scrollHeight - clientHeight)) * 100;
  }
}
