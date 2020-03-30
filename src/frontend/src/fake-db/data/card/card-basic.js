import mock from '@/fake-db/mock';

const data = {
  pixinvent_product_1: {
    img: require('@/assets/images/pages/content-img-1.jpg'),
    title: 'Vuexy Admin',
    subtitle: 'By Pixinvent Creative Studio',
    subtitle_2: 'Elite Author'
  },
  pixinvent_product_sales_1: {
    img: require('@/assets/images/pages/content-img-2.jpg'),
    title: 'Vuexy Admin',
    subtitle: 'By Pixinvent Creative Studio',
    footer_text_left_value: '$ 4785.78',
    footer_text_left_label: 'Income',
    footer_text_right_value: '12 June 2019',
    footer_text_right_label: 'Release Date'
  },
  pixinvent_product_goal_1: {
    img: require('@/assets/images/pages/content-img-3.jpg'),
    title: 'Vuexy Admin',
    progress_done_per: 75,
    current_progress: '$ 5975',
    progress_goal: '$ 8000',
    btn_left_text: 'Add More',
    btn_right_text: 'Remove'
  },
  user_detail_89: {
    userImg: require('@/assets/images/portrait/small/avatar-s-12.jpg'),
    name: 'Zoila Legore',
    profession: 'Backend Dev',
    btn_1_text: 'Follow',
    btn_2_text: 'Message',
    footer_text_1_icon: 'StarIcon',
    footer_text_1: '4.9',
    footer_text_2_icon: 'BriefcaseIcon',
    footer_text_2: '37 Projects'
  },
  user_detail_58: {
    userImg: require('@/assets/images/portrait/small/avatar-s-12.jpg'),
    name: 'Wilhelmina Jamal',
    profession: 'Frontend Dev',
    user_meta_1_title: 568,
    user_meta_1_label: 'Uploads',
    user_meta_2_title: '78.6K',
    user_meta_2_label: 'Followers',
    user_meta_3_title: 112,
    user_meta_3_label: 'Following',
    btn_text: 'Follow'
  },
  user_detail_16: {
    userImg: require('@/assets/images/portrait/small/avatar-s-1.jpg'),
    name: 'Jonell Binion',
    profession: 'Designer',
    progress_done_per: 72,
    current_progress: '720 Points',
    progress_goal: '1000',
    btn_left_text: 'Follow',
    btn_right_text: 'Message'
  },
  place_detail_18: {
    overlay_img: require('@/assets/images/pages/card-image-6.jpg'),
    title: 'Beautiful Overlay',
    text:
      'Cake sesame snaps cupcake gingerbread danish I love gingerbread. Apple pie pie jujubes chupa chups muffin halvah lollipop.'
  },
  place_weather_76: {
    overlay_img: require('@/assets/images/pages/card-image-5.jpg'),
    place_name: 'New York',
    weather: 'Snowy',
    weather_icon: 'CloudSnowIcon',
    temperature: -6,
    meta: [
      {
        label: 'Precipitation',
        value: '48%'
      },
      {
        label: 'Humidity',
        value: '60%'
      },
      {
        label: 'Wind',
        value: '4823 km/h'
      }
    ]
  },
  chatLog: [
    {
      senderImg: require('@/assets/images/portrait/small/avatar-s-2.jpg'),
      msg: 'Cake sesame snaps cupcake gingerbread',
      isSent: false
    },
    {
      senderImg: require('@/assets/images/portrait/small/avatar-s-5.jpg'),
      msg: 'Apple pie pie jujubes chupa chups muffin',
      isSent: true
    },
    {
      senderImg: require('@/assets/images/portrait/small/avatar-s-2.jpg'),
      msg: 'Chocolate cake',
      isSent: false
    },
    {
      senderImg: require('@/assets/images/portrait/small/avatar-s-5.jpg'),
      msg: 'Donut sweet pie oat cake dragée fruitcake',
      isSent: true
    },
    {
      senderImg: require('@/assets/images/portrait/small/avatar-s-2.jpg'),
      msg: 'Liquorice chocolate bar jelly beans icing',
      isSent: false
    },
    {
      senderImg: require('@/assets/images/portrait/small/avatar-s-5.jpg'),
      msg: 'Pudding candy',
      isSent: true
    }
  ],
  item_reviews_12: {
    title: 'Vuexy Admin',
    subtitle: 'by Pixinvent Creative Studio',
    img: require('@/assets/images/pages/content-img-4.jpg'),
    meta: {
      likes: 368,
      comments: 341,
      dislikes: 53
    }
  },
  player_options: {
    height: '460',
    fluid: true,
    autoplay: false,
    muted: true,
    language: 'en',
    playbackRates: [0.7, 1.0, 1.5, 2.0],
    sources: [
      {
        type: 'video/mp4',
        src: 'http://vjs.zencdn.net/v/oceans.mp4'
      }
    ],
    poster: 'https://goo.gl/xcCsDd'
  }
};

mock.onGet('/api/users/pixinvent/product/1').reply(() => {
  return [200, data.pixinvent_product_1];
});

mock.onGet('/api/users/pixinvent/product/sales/1').reply(() => {
  return [200, data.pixinvent_product_sales_1];
});

mock.onGet('/api/users/pixinvent/product/goals/1').reply(() => {
  return [200, data.pixinvent_product_goal_1];
});

mock.onGet('/api/users/89').reply(() => {
  return [200, data.user_detail_89];
});

mock.onGet('/api/users/58').reply(() => {
  return [200, data.user_detail_58];
});

mock.onGet('/api/users/16').reply(() => {
  return [200, data.user_detail_16];
});

mock.onGet('/api/place/18').reply(() => {
  return [200, data.place_detail_18];
});

mock.onGet('/api/place/76/weather').reply(() => {
  return [200, data.place_weather_76];
});

mock.onGet('/api/item/12/review').reply(() => {
  return [200, data.item_reviews_12];
});

mock.onGet('/api/chat/demo-1/log').reply(() => {
  return [200, data.chatLog];
});

mock.onGet('/api/card/card-basic/player-option').reply(() => {
  return [200, data.player_options];
});
