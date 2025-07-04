import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.sass']
})
export class HeroComponent implements OnInit, OnDestroy {
  texts: string[] = [
    'Tecnologia Simples. Valor Real para Seus Clientes.',
    'Tecnologia simples. Clientes mais satisfeitos.',
    'Tecnologia simples. Experiências incríveis para seus consumidores.',
    'Tecnologia simples. Conectando seu negócio ao sucesso do cliente.',
    'Tecnologia simples. Gerando valor que seu cliente sente.',
    'Tecnologia simples. Seu cliente no centro da inovação.'
  ];

  currentText: string = this.texts[0];
  currentIndex: number = 0;
  private interval: any;

  ngOnInit(): void {
    this.startTextAnimation();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  startTextAnimation(): void {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.texts.length;
      this.currentText = this.texts[this.currentIndex];
    }, 4000); // muda a cada 4 segundos
  }
}
