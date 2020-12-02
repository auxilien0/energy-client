import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AddListItem } from 'src/store/list/list.actions';
import { Store } from '@ngxs/store';
import { ListCars, htmlGithubApi, githubAuthorizationHeader } from 'shared/store.interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'autofay';
  loading = false;
  customers: Array<{slug: string, name: string}> = [];

  constructor(private http: HttpClient, private store: Store) {}

  getUrl(url: string) {
    return this.http.get(`${htmlGithubApi}${url}`, githubAuthorizationHeader);
  }

  ngOnInit() {
    this.loading = true;
    this.getUrl('/git/trees/master?recursive=1').subscribe((data: {
      tree: ListCars[]
    }) => {
      const customers = data.tree.filter(tree => tree.path.split('/').length > 2).map(tree => {
        const path = tree.path.split('/');
        return {
          slug: path[2],
          name: path[2].replace(/csvs-parts-/gi, '').replace(/-/gi, ' ')
        }
      });
      this.customers = customers.filter((thing, index, self) =>
        index === self.findIndex((t) => t.slug === thing.slug)
      );
      this.store.dispatch(new AddListItem(data.tree));
      this.loading = false;
    })
  }

  ngOnDestroy() {}
}
