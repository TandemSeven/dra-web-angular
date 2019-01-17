import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HistoryService {
  historyChanged = new Subject<string[]>();
  constructor() {}

  set(zipcode: string) {
    const historyList = this.get();
    const pos = historyList.findIndex(zip => {
      return zip === zipcode;
    });
    if (pos > -1) {
      return;
    }
    historyList.unshift(zipcode);
    const historyString = historyList.join(',');
    localStorage.setItem('zip-history', historyString);
    this.historyChanged.next(historyList.slice(0));
  }

  get() {
    const history = localStorage.getItem('zip-history') || '';
    return history.length ? history.split(',') : [];
  }

  clear() {
    localStorage.removeItem('zip-history');
    this.historyChanged.next([]);
  }
}
