import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { Observable, Subject, Subscription } from 'rxjs';
import { ListState } from 'src/store/list/list.effect';
import { githubAuthorizationHeader, ListCars, rawDataFile, token } from '../../../shared/store.interfaces';
import { takeUntil } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit, OnDestroy {
  @Select(ListState.SelectAllItems) listItemsSubscribe: Observable<ListCars[]>;
  activeRouteSubscribtion : Subscription;
  loadingContent = false;
  private destroy: Subject<boolean> = new Subject<boolean>();
  listItems: ListCars[] = [];
  data: string = '';
  resultIsEmpty = 'Zkontrolujte připojení k internetu nebo jestli jsou data v gitu';
  JSON;
  listIndes = 0;
  errorNoMore = '';

  constructor(private activeRoute: ActivatedRoute, private http: HttpClient) {
    this.JSON = JSON;
  }

  ngOnInit() {
    this.loadingContent = true;
    this.listItemsSubscribe.pipe(takeUntil(this.destroy)).subscribe(res => {
      if (!!res) {
        this.activeRouteSubscribtion = this.activeRoute.url.subscribe(url => {
          this.listIndes = 0;
          this.errorNoMore = '';
          this.data = '';
          if (url.length && !(typeof url[1] === 'undefined')) {
            this.listItems = res.filter(item => item.path.indexOf(url[1].path) !== -1 && item.path.endsWith('csv'));
            if (this.listItems.length) {
              console.log('this.listItems[this.listIndes].path :>> ', this.listItems[this.listIndes].path);
              this.showDocument(this.listItems[this.listIndes].path);
            }
          }
        });
      }
    });
    this.loadingContent = false;
  }

  showDocument(path: string) {
    this.http.get(rawDataFile(path), {
      headers: {
        Accept: 'application/vnd.github.v3.raw',
      },
      responseType: 'text',
    })
      .subscribe((data: string) => {
        this.data = this.data.concat(data);
        this.listIndes = this.listIndes + 1;
        this.loadingContent = false;
      })
  }

  onScroll(e) {
    if (!!this.loadingContent) {
      return;
    }
    if ((document.body.scrollHeight - window.innerHeight - window.scrollY) < 50) {
      if (typeof this.listItems[this.listIndes] === undefined) {
        
      }
      if (!this.loadingContent && this.listItems.length > this.listIndes) {
        this.loadingContent = true;
        this.showDocument(this.listItems[this.listIndes].path);
      } else {
        console.log('Nemáme více dat');
        this.errorNoMore = 'Nemáme více dat';
      }
    }
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
    this.activeRouteSubscribtion.unsubscribe();
  }
}
