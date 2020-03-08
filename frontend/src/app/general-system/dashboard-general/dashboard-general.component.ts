import { Component, OnInit, OnDestroy } from '@angular/core';

import { LoadingBarService } from '@ngx-loading-bar/core';

import {
  ExchangeGeneralService,
  HeaderService,
  ProfilesGeneralService,
  SubscribersGeneralService,
  UsersGeneralService
} from 'src/app/shared';

@Component({
  selector: 'app-dashboard-general',
  templateUrl: './dashboard-general.component.html',
  styleUrls: ['./dashboard-general.component.scss']
})
export class DashboardGeneralComponent implements OnInit, OnDestroy {
  dataCards = [
    {
      avatar: "icn-exchange",
      endpoint: "exchange",
      project: "general-system",
      subtitle: "Administration of exchanges",
      count: 0,
      title: "Exchanges registered"
    },
    {
      avatar: "icn-users",
      endpoint: "users",
      project: "general-system",
      subtitle: "Administration of users",
      count: 0,
      title: "Users registered"
    },
    {
      avatar: "icn-profiles",
      endpoint: "profiles",
      project: "general-system",
      subtitle: "Administration of profiles",
      count: 0,
      title: "Profiles registered"
    },
    {
      avatar: "icn-subscribe",
      endpoint: "subscribers",
      project: "general-system",
      subtitle: "Administration of subscribers",
      count: 0,
      title: "Subscribers registered"
    }
  ];

  constructor(
    private loadingBarService: LoadingBarService,
    private headerService: HeaderService,
    private exchangeGeneralService: ExchangeGeneralService,
    private profilesGeneralService: ProfilesGeneralService,
    private subscribersGeneralService: SubscribersGeneralService,
    private usersGeneralService: UsersGeneralService
  ) { }

  ngOnInit() {
    this.headerService.headerTextChangeValue('Dashboard');

    this.headerService.numberRecordsChangeValue('');

    this.headerService.buttonObjChangeValue({});

    this.exchangeGeneralService.listExchanges().subscribe((res: any) => {
      this.dataCards[0].count = res.data.length;
    });

    this.usersGeneralService.listUsers().subscribe((res: any) => {
      this.dataCards[1].count = res.size;
    });

    this.profilesGeneralService.listProfiles().subscribe((res: any) => {
      this.dataCards[2].count = res.size;
    });

    this.subscribersGeneralService.listSubscribers().subscribe((res: any) => {
      this.dataCards[3].count = res.data.length;
    });
  }

  ngOnDestroy() {
    this.loadingBarService.stop();
  }

}
