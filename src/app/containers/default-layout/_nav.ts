import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' }

  },
  {
    name: 'Product',
    url: 'pages/adoption-request',
    iconComponent: { name: 'cil-dog' }
  },

  {
    name: 'Order',
    iconComponent: { name: 'cil-chart-pie' },
    children: [
      {
        name: 'Quản lý quỹ',
        url: 'pages/donation',
      },
      {
        name: 'Danh sách ủng hộ',
        url: 'pages/donation-request',
      },
      {
        name: 'Yêu cầu hỗ trợ',
        url: 'pages/fund-request',
      }
    ]
  },

  {
    name: 'Log out',
    url: '/login',
    iconComponent: { name: 'cil-account-logout' }
  },
];
