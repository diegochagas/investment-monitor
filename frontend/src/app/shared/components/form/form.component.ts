import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

import { LoadingBarService } from '@ngx-loading-bar/core';

import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import {
  ExchangeGeneralService,
  FiltersService
} from '../../services';

import {
  ProfilesConfig
} from '../../models';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnChanges {
  @Input() type;
  @Input() formData;
  @Input() nameButton;

  @Output() rawForm = new EventEmitter();
  @Output() rule = new EventEmitter();

  formGroupExchangeGeneral: FormGroup;
  formGroupGroupsGeneral: FormGroup;
  formGroupProfileGeneral: FormGroup;
  formGroupSearchRobot: FormGroup;
  formGroupStrategiesGarch: FormGroup;
  formGroupStrategiesMarket: FormGroup;
  formGroupStrategiesTelegram: FormGroup;
  formGroupSubscriberGeneral: FormGroup;

  displayedColumns = [];
  dataSource = [];

  filteredOptions;

  exchanges;

  currencies = [];

  resetFormCache;

  iconExchange;

  profiles = [];

  expansionPanelExpanded = {};

  checkboxArr = [];

  expansionPanelToggle = false;

  exchangesInside;

  exchangesOutside;

  topicTypes = [];

  weights = [];

  constructor(
    private exchangeGeneralService: ExchangeGeneralService,
    private filtersService: FiltersService,
    private formBuilder: FormBuilder,
    private loadingBarService: LoadingBarService,
    private profilesConfig: ProfilesConfig
  ) {
    this.formGroupStrategiesMarket = this.formBuilder.group({
      name: ['', [Validators.required]],
      exchange: ['', [Validators.required]],
      iniPair: ['', [Validators.required]],
      finPair: ['', [Validators.required]],
      midPriceType: ['', [Validators.required]],
      subscribe: ['', [Validators.required]],
      initialMidPriceType: 'INSIDE',
      exchangesInside: '',
      exchangesOutside: '',
      forexEnable: false,
      prexBand: 2,
      externalPercent: 100,
      internalPercent: 0,
      statusInterval: 60000,
      dataReloadInterval: 10000,
      expLimit: 2,
      expLimitStep: 0.5,
      expSpread: 0.5,
      sizeMultiply: 0.1,
      wallet: 1000,
      midPrice: 9000,
      defaultSpread: 10,
      maxOrders: 4,
      amountOrders: 1,
      ordersInterval: 0.04,
      orderSize: 0.04,
      stepSize: 0.04,
      fractionPercent: 0.04,
      fractionQuantity: 4,
      ask: 0,
      bid: 0,
      stopLoss: 5
    });

    this.formGroupExchangeGeneral = this.formBuilder.group({
      name: ['', [Validators.required]],
      url: ['', [Validators.required]],
      iconFile: '',
      maxConcurrentRequests: 1,
      minTimeBetweenRequests: 175
    });

    this.formGroupProfileGeneral = this.formBuilder.group({
      id: ['', [Validators.required]],
      applications: [[], [Validators.required]]
    });

    this.formGroupSubscriberGeneral = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', []],
      group: ['', []]
    });

    this.formGroupGroupsGeneral = this.formBuilder.group({
      name: ['', [Validators.required]],
      groupId: ['', [Validators.required]]
    });

    this.formGroupStrategiesTelegram = this.formBuilder.group({
      name: ['', [Validators.required]],
      exchange: ['', [Validators.required]],
      size: 0,
      pairs: [[], [Validators.required]]
    });

    this.formGroupStrategiesGarch = this.formBuilder.group({
      name: ['', [Validators.required]],
      exchange: ['', [Validators.required]],
      candleTime: 1,
      expose: 50,
      fee: 0.002,
      orderType: "MARKET",
      stop: 0.02,
      tradeWindow: "1MIN",
      usd: 15,
      maxSamples: 0,
      iniPair: ['', [Validators.required]],
      finPair: ['', [Validators.required]],
      takeProfit: 0,
      idleMinutesAfterStop: 0,
      stopLimit: 0,
      stopLimitTrigger: 0
    });

    this.formGroupSearchRobot = this.formBuilder.group({
      robotId: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    if (this.type == 'strategies-market') {
      this.resetFormCache = this.formGroupStrategiesMarket.value;

      this.exchangeGeneralService.listExchanges().subscribe((response) => {
        this.exchanges = response['data'];
      });

      this.filtersService.listCurrencies().toPromise().then((response) => {
        this.currencies = response.data().currencies;
      });

      this.formGroupStrategiesMarket.get('iniPair').valueChanges.subscribe((value) => {
        this.filteredOptions = this.filterCurrencies(value);

        if (this.onePairIsBRL()) this.formGroupStrategiesMarket.patchValue({ 'forexEnable': true });
      });

      this.formGroupStrategiesMarket.get('finPair').valueChanges.subscribe((value) => {
        this.filteredOptions = this.filterCurrencies(value);

        if (this.onePairIsBRL()) this.formGroupStrategiesMarket.patchValue({ 'forexEnable': true });
      });

      this.exchangesInside = [
        'COINAPI_BRAZILIEX_TICKER_BTC_BRL',
        'COINAPI_BRAZILIEX_TICKER_BTC_BRL'
      ];

      this.exchangesOutside = [
        'COINAPI_BITFINEX_TICKER_BTC_USD',
        'COINAPI_BITSTAMP_TICKER_BTC_USD'
      ];
    }

    if (this.type === 'strategies-garch') {
      this.filtersService.listCurrencies().toPromise().then((response) => {
        this.currencies = response.data().currencies;
      });

      this.formGroupStrategiesGarch.get('iniPair').valueChanges.subscribe((value) => {
        this.filteredOptions = this.filterCurrencies(value);
      });

      this.formGroupStrategiesGarch.get('finPair').valueChanges.subscribe((value) => {
        this.filteredOptions = this.filterCurrencies(value);
      });

      this.exchangeGeneralService.listExchanges().subscribe((response: any) => {
        this.exchanges = response.data;
      });
    }

    if (this.type == 'strategies-telegram') {
      this.exchangeGeneralService.listExchanges().subscribe((response) => {
        this.exchanges = response['data'];
      });
    }

    if (this.type == 'profiles-general') {
      this.displayedColumns = ['path', 'rules'];
    }

    if (this.type === 'subscriber-general') {
      this.topicTypes = ['CANDLE', 'FOREX', 'QUOTE', 'TICKER', 'TRADE'];
    }

    if (this.type === 'search-robot') {
      this.formGroupSearchRobot.controls.robotId.valueChanges.pipe(debounceTime(1000), distinctUntilChanged()).subscribe(() => this.rawSend());
    }
  }

  ngOnChanges(changes) {
    if (changes.formData) {
      if (!changes.formData.firstChange) {
        if (this.type == 'exchange-general') { this.formGroupExchangeGeneral.patchValue(changes.formData.currentValue); }
        if (this.type == 'groups-general') { this.formGroupGroupsGeneral.patchValue(changes.formData.currentValue); }
        if (this.type == 'profiles-general') { this.formGroupProfileGeneral.patchValue(changes.formData.currentValue); this.setCheckboxArr(); }
        if (this.type == 'strategies-garch') { this.formGroupStrategiesGarch.patchValue(changes.formData.currentValue); }
        if (this.type == 'strategies-market') { this.formGroupStrategiesMarket.patchValue(changes.formData.currentValue); }
        if (this.type == 'strategies-telegram') { this.formGroupStrategiesTelegram.patchValue(changes.formData.currentValue); }
        if (this.type == 'subscriber-general') { this.formGroupSubscriberGeneral.patchValue(changes.formData.currentValue); }
      }
    }
  }

  expansionPanel(mep, mTable, name) {
    mep.expanded = !mep.expanded;

    for (let i = 0; i < mTable.checkboxArr.length; i++) {
      if (mTable.checkboxArr[i].name === name) {
        mTable.checkboxArr[i].pages = mTable.checkboxArr[i].pages.map((o) => { return { path: o.path, isChecked: mep.expanded }; });
      }
    }

    this.profiles.map((profile) => (profile.name == name) ? profile.pages.map((page) => page.rule = "read") : "");

    let cacheAplications = Object.assign(this.formGroupProfileGeneral.value.applications);

    let indexApplications;

    if (mep.expanded) {
      indexApplications = _.findIndex(this.profiles, function(o) { return o.name === name; });

      let dataPanel = { name: this.profiles[indexApplications].name, pages: [...this.profiles[indexApplications].pages] };

      cacheAplications.push(dataPanel);
    } else {
      indexApplications = _.findIndex(cacheAplications, function(o) { return o.name === name; });

      cacheAplications.splice(indexApplications, 1);
    }

    this.formGroupProfileGeneral.patchValue({
      applications: cacheAplications
    });
  }

  changeCheckboxArr(obj) {
    let cacheAplications = Object.assign(this.formGroupProfileGeneral.value.applications);

    for (let i = 0; i < this.checkboxArr.length; i++) {
      if (this.checkboxArr[i].name === obj.name) {
        for (let ii = 0; ii < this.checkboxArr[i].pages.length; ii++) {
          if (this.checkboxArr[i].pages[ii].path == obj.path) {
            this.checkboxArr[i].pages[ii].isChecked = !this.checkboxArr[i].pages[ii].isChecked;

            for (let iii = 0; iii < this.profiles.length; iii++) {
              if (this.profiles[iii].name == obj.name) {
                let indexProfiles;

                for (let iiii = 0; iiii < cacheAplications.length; iiii++) {
                  if (cacheAplications[iiii].name == obj.name) {
                    if (this.checkboxArr[i].pages[ii].isChecked) {
                      indexProfiles = _.findIndex(this.profiles[iii].pages, function(o) { return o.path === obj.path; });

                      let dataPath = Object.assign({}, this.profiles[iii].pages[indexProfiles]);

                      cacheAplications[iiii].pages.push(dataPath);
                    } else {
                      indexProfiles = _.findIndex(cacheAplications[iiii].pages, function(o) { return o.path === obj.path; });

                      cacheAplications[iiii].pages.splice(indexProfiles, 1);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    this.formGroupProfileGeneral.patchValue({
      applications: cacheAplications
    });
  }

  filterCurrencies(value) {
    return this.currencies.filter(option => option['symbol'].toLowerCase().includes(value.toLowerCase()));
  }

  setFormData(data) {
    if (this.type == 'strategies-telegram') { this.formGroupStrategiesTelegram.patchValue(data); }
  }

  setCheckboxArr() {
    this.expansionPanelExpanded = {};

    this.profiles = this.profilesConfig.config;

    for (let i = 0; i < this.profiles.length; i++) {
      this.expansionPanelExpanded[this.profiles[i]] = false;
    }

    for (let i = 0; i < this.profiles.length; i++) {
      this.checkboxArr.push({ name: this.profiles[i].name, pages: [] });

      for (let ii = 0; ii < this.profiles[i].pages.length; ii++) {
        this.checkboxArr[i].pages.push({ path: this.profiles[i].pages[ii].path, isChecked: false });
      }
    }

    this.loadingBarService.complete();

    this.setApplications();
  }

  setApplications() {
    for (let i = 0; i < this.profiles.length; i++) {
      if (this.formGroupProfileGeneral.value.applications.length > 0) {
        for (let iii = 0; iii < this.formGroupProfileGeneral.value.applications.length; iii++) {
          if (this.formGroupProfileGeneral.value.applications[iii].name === this.profiles[i].name) {
            this.expansionPanelExpanded[this.profiles[i].name] = true;

            this.profiles[i].pages.map((o) => {
              for (let iiiiii = 0; iiiiii < this.formGroupProfileGeneral.value.applications[iii].pages.length; iiiiii++) {
                if (this.formGroupProfileGeneral.value.applications[iii].pages[iiiiii].path == o.path) {
                  o.rule = this.formGroupProfileGeneral.value.applications[iii].pages[iiiiii].rule;
                }
              }
            });

            for (let iiii = 0; iiii < this.formGroupProfileGeneral.value.applications[iii].pages.length; iiii++) {
              for (let iiiii = 0; iiiii < this.checkboxArr.length; iiiii++) {
                if (this.checkboxArr[iiiii].name === this.profiles[i].name) {
                  let path = this.formGroupProfileGeneral.value.applications[iii].pages[iiii].path;

                  let indexPages = _.findIndex(this.checkboxArr[iiiii].pages, function(o) { return o.path === path; });

                  if (this.checkboxArr[iiiii].pages[indexPages]) {
                    this.checkboxArr[iiiii].pages[indexPages].isChecked = true;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  setIni(val) {
    if (this.type == 'strategies-market') {
      this.formGroupStrategiesMarket.patchValue({
        iniPair: val
      });

      if (this.onePairIsBRL()) this.formGroupStrategiesMarket.patchValue({ 'forexEnable': true });
    }

    this.filteredOptions = this.filterCurrencies('');
  }

  setFin(val) {
    if (this.type == 'strategies-market') {
      this.formGroupStrategiesMarket.patchValue({
        finPair: val
      });

      if (this.onePairIsBRL()) this.formGroupStrategiesMarket.patchValue({ 'forexEnable': true });
    }

    this.filteredOptions = this.filterCurrencies('');
  }

  onePairIsBRL() {
    return this.formGroupStrategiesMarket.value.iniPair === 'BRL' || this.formGroupStrategiesMarket.value.finPair === 'BRL';
  }

  setRule(obj) {
    let cacheAplications = Object.assign(this.formGroupProfileGeneral.value.applications);

    for (let i = 0; i < cacheAplications.length; i++) {
      if (cacheAplications[i].name === obj.name) {
        if (!_.findKey(cacheAplications[i].pages, function(o) { return o.path == obj.path; })) {
          this.changeCheckboxArr(obj);
        }

        for (let ii = 0; ii < cacheAplications[i].pages.length; ii++) {
          if (cacheAplications[i].pages[ii].path === obj.path) {
            cacheAplications[i].pages[ii].rule = obj.rule;
          }
        }
      }
    }

    this.formGroupProfileGeneral.patchValue({
      applications: cacheAplications
    });
  }

  setType(type: string) {
    this.formGroupSubscriberGeneral.patchValue({ type });
  }

  setGroup(group: string) {
    this.formGroupSubscriberGeneral.patchValue({ group });
  }

  calcBidAsk(val, type) {
    if (type == "ask") {
      this.formGroupStrategiesMarket.patchValue({
        ask: val.value
      });
    } else if (type == "bid") {
      this.formGroupStrategiesMarket.patchValue({
        bid: val.value
      });
    }
  }

  rawSend() {
    if (this.type == 'exchange-general') { this.rawForm.emit(this.formGroupExchangeGeneral.value); }
    if (this.type == 'groups-general') { this.rawForm.emit(this.formGroupGroupsGeneral.value); }
    if (this.type == 'profiles-general') { this.rawForm.emit(this.formGroupProfileGeneral.value); }
    if (this.type == 'strategies-garch') { this.rawForm.emit(this.formGroupStrategiesGarch.value); }
    if (this.type == 'strategies-market') { this.rawForm.emit(this.formGroupStrategiesMarket.value); }
    if (this.type == 'strategies-telegram') { this.rawForm.emit(this.formGroupStrategiesTelegram.value); }
    if (this.type == 'subscriber-general') {
      const rawSubscriber = this.formGroupSubscriberGeneral.value.group ? this.formGroupSubscriberGeneral.value : {
        name: this.formGroupSubscriberGeneral.value.name,
        type: this.formGroupSubscriberGeneral.value.type
      };

      this.rawForm.emit(rawSubscriber);
    }
    if (this.type == 'search-robot') { this.rawForm.emit(this.formGroupSearchRobot.value.robotId); }
  }

  resetForm() {
    if (this.type == 'exchange-general') { this.formGroupExchangeGeneral.reset(); }
    if (this.type == 'groups-general') { this.formGroupGroupsGeneral.reset(); }
    if (this.type == 'profiles-general') { this.formGroupProfileGeneral.reset(); }
    if (this.type == 'strategy-market') { this.formGroupStrategiesMarket.patchValue(this.resetFormCache); }
    if (this.type == 'subscriber-general') { this.formGroupSubscriberGeneral.reset(); }
  }

  readThisIconFileBase64($event: any): void {
    let file:File = $event.target.files[0];
    let myReader:FileReader = new FileReader();

    myReader.onloadend = () => {
      this.formGroupExchangeGeneral.patchValue({
        iconFile: myReader.result
      });
    }

    myReader.readAsDataURL(file);
  }

  formatValue(path, rule) {
    return { path: path, rule: rule };
  }

}
