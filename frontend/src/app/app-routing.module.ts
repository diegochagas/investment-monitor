import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  FrontPageComponent,
  LoginComponent,
  OopsComponent
} from './';

import {
  AddStrategiesMarketComponent,
  BotMarketComponent,
  DashboardMarketComponent,
  ListStrategiesMarketComponent,
  RobotsMarketComponent,
  StrategiesMarketComponent,
  ViewStrategiesMarketComponent
} from './bot-market';

import {
  AddExchangeGeneralComponent,
  AddGroupsGeneralComponent,
  AddProfilesGeneralComponent,
  AddSubscribersGeneralComponent,
  DashboardGeneralComponent,
  ExchangeGeneralComponent,
  GeneralSystemComponent,
  GroupsGeneralComponent,
  ListExchangeGeneralComponent,
  ListGroupsGeneralComponent,
  ListProfilesGeneralComponent,
  ListSubscribersGeneralComponent,
  ProfilesGeneralComponent,
  SubscribersGeneralComponent,
  UsersGeneralComponent,
  ViewExchangeGeneralComponent,
  ViewGroupsGeneralComponent,
  ViewProfilesGeneralComponent,
  ViewSubscribersGeneralComponent,
} from './general-system';

import {
  AddStrategiesTelegramComponent,
  DashboardTelegramComponent,
  ListStrategiesTelegramComponent,
  RobotsTelegramComponent,
  StrategiesTelegramComponent,
  ViewStrategiesTelegramComponent,
  BotTelegramComponent
} from './bot-telegram';

import {
  AddStrategiesGarchComponent,
  BotGarchComponent,
  DashboardGarchComponent,
  ListStrategiesGarchComponent,
  RobotsGarchComponent,
  StrategiesGarchComponent,
  ViewStrategiesGarchComponent
} from './bot-garch';

import {
  AddStrategiesCoinsComponent,
  BotCoinsComponent,
  DashboardCoinsComponent,
  ListStrategiesCoinsComponent,
  RobotsCoinsComponent,
  StrategiesCoinsComponent,
  ViewStrategiesCoinsComponent
} from './bot-coins';

import {
  LoginGuard
} from './shared';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'front-page',
    component: FrontPageComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'bot-market',
    component: BotMarketComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: '/bot-market/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardMarketComponent
      },
      {
        path: 'dashboard/:id',
        component: DashboardMarketComponent
      },
      {
        path: 'robots',
        component: RobotsMarketComponent
      },
      {
        path: 'strategies',
        component: StrategiesMarketComponent,
        children: [
          {
            path: '',
            redirectTo: '/bot-market/strategies/list',
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddStrategiesMarketComponent
          },
          {
            path: 'list',
            component: ListStrategiesMarketComponent
          },
          {
            path: 'view/:id',
            component: ViewStrategiesMarketComponent
          }
        ]
      }
    ]
  },
  {
    path: 'general-system',
    component: GeneralSystemComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: '/general-system/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardGeneralComponent
      },
      {
        path: 'exchange',
        component: ExchangeGeneralComponent,
        children: [
          {
            path: '',
            redirectTo: '/general-system/exchange/list',
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddExchangeGeneralComponent
          },
          {
            path: 'list',
            component: ListExchangeGeneralComponent
          },
          {
            path: 'view/:id',
            component: ViewExchangeGeneralComponent
          }
        ]
      },
      {
        path: 'users',
        component: UsersGeneralComponent
      },
      {
        path: 'profiles',
        component: ProfilesGeneralComponent,
        children: [
          {
            path: '',
            redirectTo: '/general-system/profiles/list',
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddProfilesGeneralComponent
          },
          {
            path: 'list',
            component: ListProfilesGeneralComponent
          },
          {
            path: 'view/:id',
            component: ViewProfilesGeneralComponent
          }
        ]
      },
      {
        path: 'subscribers',
        component: SubscribersGeneralComponent,
        children: [
          {
            path: '',
            redirectTo: '/general-system/subscribers/list',
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddSubscribersGeneralComponent
          },
          {
            path: 'list',
            component: ListSubscribersGeneralComponent
          },
          {
            path: 'view/:id',
            component: ViewSubscribersGeneralComponent
          }
        ]
      },
      {
        path: 'groups',
        component: GroupsGeneralComponent,
        children: [
          {
            path: '',
            redirectTo: '/general-system/groups/list',
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddGroupsGeneralComponent
          },
          {
            path: 'list',
            component: ListGroupsGeneralComponent
          },
          {
            path: 'view/:id',
            component: ViewGroupsGeneralComponent
          }
        ]
      }
    ]
  },
  {
    path: 'bot-telegram',
    component: BotTelegramComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: '/bot-telegram/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardTelegramComponent
      },
      {
        path: 'dashboard/:id',
        component: DashboardTelegramComponent
      },
      {
        path: 'robots',
        component: RobotsTelegramComponent
      },
      {
        path: 'strategies',
        component: StrategiesTelegramComponent,
        children: [
          {
            path: '',
            redirectTo: '/bot-telegram/strategies/list',
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddStrategiesTelegramComponent
          },
          {
            path: 'list',
            component: ListStrategiesTelegramComponent
          },
          {
            path: 'view/:id',
            component: ViewStrategiesTelegramComponent
          }
        ]
      }
    ]
  },
  {
    path: 'bot-garch',
    component: BotGarchComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: '/bot-garch/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardGarchComponent
      },
      {
        path: 'dashboard/:id',
        component: DashboardGarchComponent
      },
      {
        path: 'robots',
        component: RobotsGarchComponent
      },
      {
        path: 'strategies',
        component: StrategiesGarchComponent,
        children: [
          {
            path: '',
            redirectTo: '/bot-garch/strategies/list',
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddStrategiesGarchComponent
          },
          {
            path: 'list',
            component: ListStrategiesGarchComponent
          },
          {
            path: 'view/:id',
            component: ViewStrategiesGarchComponent
          }
        ]
      }
    ]
  },
  {
    path: 'bot-coins',
    component: BotCoinsComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        redirectTo: '/bot-coins/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardCoinsComponent
      },
      {
        path: 'dashboard/:id',
        component: DashboardCoinsComponent
      },
      {
        path: 'robots',
        component: RobotsCoinsComponent
      },
      {
        path: 'strategies',
        component: StrategiesCoinsComponent,
        children: [
          {
            path: '',
            redirectTo: '/bot-coins/strategies/list',
            pathMatch: 'full'
          },
          {
            path: 'add',
            component: AddStrategiesCoinsComponent
          },
          {
            path: 'list',
            component: ListStrategiesCoinsComponent
          },
          {
            path: 'view/:id',
            component: ViewStrategiesCoinsComponent
          }
        ]
      }
    ]
  },
  {
    path: '**',
    component: OopsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
