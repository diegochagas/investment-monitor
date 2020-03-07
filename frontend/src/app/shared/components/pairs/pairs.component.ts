import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

import {
  ExchangeGeneralService,
  FiltersService
} from '../../services';

import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-pairs',
  templateUrl: './pairs.component.html',
  styleUrls: ['./pairs.component.scss']
})
export class PairsComponent implements OnInit {
  @Output() pairsArr = new EventEmitter();

  @Input() pairs = [];

  exchanges = [];

  weights = [];

  filteredOptions;

  currencies;

  formGroupPairs: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private exchangeGeneralService: ExchangeGeneralService,
    private filtersService: FiltersService,
    private loadingBarService: LoadingBarService
  ) {
    this.formGroupPairs = this.formBuilder.group({
      iniPair: ['', [Validators.required]],
      finPair: ['', [Validators.required]],
      exchange: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      quantity: [0, [Validators.required]],
      type: ['', [Validators.required]],
      coin: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadingBarService.stop();

    this.loadingBarService.start();

    this.filtersService.listCurrencies().toPromise().then((response) => {
      this.filteredOptions = response.data().currencies;

      this.currencies = response.data().currencies;

      this.loadingBarService.complete();
    });

    this.exchangeGeneralService.listExchanges().subscribe((response) => {
      this.exchanges = response['data'];
    });

    this.formGroupPairs.get('iniPair').valueChanges.subscribe((value) => {
      this.filteredOptions = this.filterCurrencies(value);
    });

    this.formGroupPairs.get('finPair').valueChanges.subscribe((value) => {
      this.filteredOptions = this.filterCurrencies(value);
    });

    this.weights = ['A', 'B', 'C', 'D', 'E', 'F'];
  }

  addPair() {
    let iniPair = this.formGroupPairs.value.iniPair;

    let finPair = this.formGroupPairs.value.finPair;

    if (this.pairs.length > 0) {
      let filter = [];

      filter = _.filter(this.pairs, function(o) { return o.iniPair+o.finPair == iniPair+finPair; });

      if (filter.length == 0) {
        this.pairs.push(this.formGroupPairs.value);
      }
    } else {
      this.pairs.push(this.formGroupPairs.value);
    }

    this.pairsArr.emit(this.pairs);
  }

  delPair(index) {
    let iniPair = this.pairs[index].iniPair;

    let finPair = this.pairs[index].finPair;

    _.remove(this.pairs, function(o) { return o.iniPair+o.finPair == iniPair+finPair; });

    this.pairsArr.emit(this.pairs);
  }

  filterCurrencies(value) {
    return this.currencies.filter(option => option['symbol'].toLowerCase().includes(value.toLowerCase()));
  }

  resetFilteredOptions() {
    this.filteredOptions = this.filterCurrencies('');
  }

}
