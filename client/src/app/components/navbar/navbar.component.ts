import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent {
  isMenuCollapsed = true;

  scrollToSection(sectionId: string): void {
    this.isMenuCollapsed = true;

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = document.querySelector('.navbar')?.clientHeight || 0;
        const offsetPosition = element.offsetTop - navbarHeight - 20; // 20px extra para espaçamento

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
}
