import mock from '@/fake-db/mock';

const data = {
  subscribers_gained: {
    series: [
      {
        name: 'Subscribers',
        data: [28, 40, 36, 52, 38, 60, 55]
      }
    ],
    analyticsData: {
      subscribers: 92600
    }
  },
  revenueGenerated: {
    series: [
      {
        name: 'Revenue',
        data: [350, 275, 400, 300, 350, 300, 450]
      }
    ],
    analyticsData: {
      revenue: 97500
    }
  },
  quarterlySales: {
    series: [
      {
        name: 'Sales',
        data: [10, 15, 7, 12, 3, 16]
      }
    ],
    analyticsData: {
      sales: '36%'
    }
  },
  ordersRecevied: {
    series: [
      {
        name: 'Orders',
        data: [10, 15, 8, 15, 7, 12, 8]
      }
    ],
    analyticsData: {
      orders: 97500
    }
  },
  siteTraffic: {
    series: [
      {
        name: 'Traffic Rate',
        data: [150, 200, 125, 225, 200, 250]
      }
    ]
  },
  activeUsers: {
    series: [
      {
        name: 'Active Users',
        data: [750, 1000, 900, 1250, 1000, 1200, 1100]
      }
    ]
  },
  newsletter: {
    series: [
      {
        name: 'Newsletter',
        data: [365, 390, 365, 400, 375, 400]
      }
    ]
  }
};

mock.onGet('/api/card/card-statistics/subscribers').reply(() => {
  return [200, data.subscribers_gained];
});

mock.onGet('/api/card/card-statistics/revenue').reply(() => {
  return [200, data.revenueGenerated];
});

mock.onGet('/api/card/card-statistics/sales').reply(() => {
  return [200, data.quarterlySales];
});

mock.onGet('/api/card/card-statistics/orders').reply(() => {
  return [200, data.ordersRecevied];
});

mock.onGet('/api/card/card-statistics/site-traffic').reply(() => {
  return [200, data.siteTraffic];
});

mock.onGet('/api/card/card-statistics/active-users').reply(() => {
  return [200, data.activeUsers];
});

mock.onGet('/api/card/card-statistics/newsletter').reply(() => {
  return [200, data.newsletter];
});
