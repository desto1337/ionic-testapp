import { Component, OnInit } from '@angular/core';
import { CockpitService } from 'src/app/services/cockpit.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  articles: Observable<any>;
  // articles = null;

  constructor(private cockpitService: CockpitService) { }

  ngOnInit() {
    this.articles = this.cockpitService.getArticles();

    // this.articles.subscribe(res => {
    //   console.log('Artikel: ', res);
    //   this.articles = res;
    // });
  }

}
