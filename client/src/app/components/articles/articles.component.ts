import { Component, OnInit } from '@angular/core';
import { ArticlesService } from 'src/app/services/articles/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass'],
})
export class ArticlesComponent implements OnInit {
  articles: any;
  constructor(private articlesService: ArticlesService) {}
  ngOnInit(): void {
    this.getArticles();
  }
  getArticles(){
    this.articlesService.getArticles().subscribe({
      next: (result) => {
        this.articles = result.body?.slice(0,6);
        console.log(result);
      }
    })
  };
}
