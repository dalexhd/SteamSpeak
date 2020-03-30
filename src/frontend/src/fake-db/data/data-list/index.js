import mock from '@/fake-db/mock';

const data = {
  products: [
    {
      id: 1,
      category: 'computers',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
      name: 'Apple Watch series 4 GPS',
      order_status: 'on_hold',
      popularity: 97,
      price: 69.99
    },
    {
      id: 2,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/02.png',
      name: 'Beats HeadPhones',
      order_status: 'delivered',
      popularity: 83,
      price: 69.99
    },
    {
      id: 3,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/06.png',
      name: 'Altec Lansing - Bluetooth Speaker',
      order_status: 'canceled',
      popularity: 57,
      price: 199.99
    },
    {
      id: 4,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Altec Lansing - Bluetooth Speaker',
      order_status: 'delivered',
      popularity: 65,
      price: 199.99
    },
    {
      id: 5,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/06.png',
      name: 'Altec Lansing - Portable Bluetooth Speaker',
      order_status: 'canceled',
      popularity: 87,
      price: 199.99
    },
    {
      id: 6,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Altec Lansing - Bluetooth Speaker',
      order_status: 'canceled',
      popularity: 55,
      price: 39.99
    },
    {
      id: 7,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/02.png',
      name: 'Altec Lansing - Mini H2O Bluetooth Speaker',
      order_status: 'on_hold',
      popularity: 99,
      price: 39.99
    },
    {
      id: 8,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Altec Lansing - Bluetooth Speaker',
      order_status: 'canceled',
      popularity: 91,
      price: 39.99
    },
    {
      id: 9,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Altec Lansing - Mini H2O Bluetooth Speaker',
      order_status: 'delivered',
      popularity: 52,
      price: 39.99
    },
    {
      id: 10,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
      name: 'Altec Lansing - Mini H2O Bluetooth Speaker',
      order_status: 'canceled',
      popularity: 64,
      price: 39.99
    },
    {
      id: 11,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Altec Lansing - Bluetooth Speaker',
      order_status: 'canceled',
      popularity: 93,
      price: 99.99
    },
    {
      id: 12,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
      name: 'Altec Lansing - Bluetooth Speaker',
      order_status: 'pending',
      popularity: 75,
      price: 99.99
    },
    {
      id: 13,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
      name: 'Altec Lansing - Bluetooth Speaker',
      order_status: 'delivered',
      popularity: 88,
      price: 99.99
    },
    {
      id: 14,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Altec Lansing - Bluetooth Speaker',
      order_status: 'delivered',
      popularity: 86,
      price: 99.99
    },
    {
      id: 15,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Aluratek - Bluetooth Audio Receiver',
      order_status: 'on_hold',
      popularity: 62,
      price: 29.99
    },
    {
      id: 16,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/04.png',
      name: 'Aluratek - Bluetooth Audio Transmitter',
      order_status: 'canceled',
      popularity: 51,
      price: 29.99
    },
    {
      id: 17,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/07.png',
      name: 'Aluratek - iStream Bluetooth Audio Receiver',
      order_status: 'pending',
      popularity: 51,
      price: 29.99
    },
    {
      id: 18,
      category: 'computers',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/07.png',
      name: 'Antec - Nano Diamond Thermal Compound',
      order_status: 'on_hold',
      popularity: 65,
      price: 14.99
    },
    {
      id: 19,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Antec - SmartBean Bluetooth Adapter',
      order_status: 'on_hold',
      popularity: 63,
      price: 39.99
    },
    {
      id: 20,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Basis - Peak Fitness and Sleep Tracker',
      order_status: 'on_hold',
      popularity: 72,
      price: 199.99
    },
    {
      id: 21,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Basis - Peak Fitness and Sleep Tracker',
      order_status: 'canceled',
      popularity: 77,
      price: 199.99
    },
    {
      id: 22,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/04.png',
      name: "Beats by Dr. Dre - 3' USB-to-Micro USB Cable",
      order_status: 'delivered',
      popularity: 65,
      price: 19.99
    },
    {
      id: 23,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/02.png',
      name: 'Beats by Dr. Dre - Bike Mount for Pill Speakers',
      order_status: 'delivered',
      popularity: 60,
      price: 49.99
    },
    {
      id: 24,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/06.png',
      name: 'Beats by Dr. Dre - Support Stand for Speakers',
      order_status: 'on_hold',
      popularity: 59,
      price: 49.99
    },
    {
      id: 25,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/08.png',
      name: 'Beats by Dr. Dre - Support Stand for Pill Speakers',
      order_status: 'on_hold',
      popularity: 87,
      price: 49.99
    },
    {
      id: 26,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/08.png',
      name: 'Beats by Dr. Dre - Support Stand for Pill Speakers',
      order_status: 'delivered',
      popularity: 95,
      price: 49.99
    },
    {
      id: 27,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/07.png',
      name: 'Beats by Dr. Dre - Support Stand for Speakers',
      order_status: 'canceled',
      popularity: 98,
      price: 49.99
    },
    {
      id: 28,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/04.png',
      name: 'Beats by Dr. Dre - Support Stand',
      order_status: 'delivered',
      popularity: 75,
      price: 49.99
    },
    {
      id: 29,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/06.png',
      name: 'Beats by Dr. Dre - Pill 2.0 Bluetooth Speaker',
      order_status: 'pending',
      popularity: 81,
      price: 199.99
    },
    {
      id: 30,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/07.png',
      name: 'Beats by Dr. Dre - Pill 2.0 Bluetooth Speaker',
      order_status: 'canceled',
      popularity: 91,
      price: 199.99
    },
    {
      id: 31,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/04.png',
      name: 'Beats by Dr. Dre - Bluetooth Speaker',
      order_status: 'canceled',
      popularity: 79,
      price: 199.99
    },
    {
      id: 32,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Beats by Dr. Dre - Portable Speaker + Headphones',
      order_status: 'on_hold',
      popularity: 95,
      price: 699.99
    },
    {
      id: 33,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/03.png',
      name: 'Beats by Dr. Dre - Pill 2.0 Portable Stereo Speaker',
      order_status: 'on_hold',
      popularity: 90,
      price: 199.99
    },
    {
      id: 34,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Bose® - SoundLink® III Cover',
      order_status: 'delivered',
      popularity: 81,
      price: 34.99
    },
    {
      id: 35,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/08.png',
      name: 'Bose® - Bose® SoundLink® III Cover',
      order_status: 'delivered',
      popularity: 81,
      price: 34.99
    },
    {
      id: 36,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Bose® - SoundLink® III Cover',
      order_status: 'on_hold',
      popularity: 69,
      price: 34.99
    },
    {
      id: 37,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Bose® - SoundLink® Mini Soft Cover',
      order_status: 'canceled',
      popularity: 95,
      price: 24.99
    },
    {
      id: 38,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
      name: 'Bose® - SoundLink® Color Bluetooth Speaker',
      order_status: 'on_hold',
      popularity: 100,
      price: 129.99
    },
    {
      id: 39,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
      name: 'Bose® - SoundLink® Color Bluetooth Speaker',
      order_status: 'pending',
      popularity: 89,
      price: 129.99
    },
    {
      id: 40,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/08.png',
      name: 'Bose® - SoundLink® Color Bluetooth Speaker',
      order_status: 'pending',
      popularity: 75,
      price: 129.99
    },
    {
      id: 41,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/06.png',
      name: 'Bose® - SoundLink® Color Bluetooth Speaker',
      order_status: 'pending',
      popularity: 54,
      price: 129.99
    },
    {
      id: 42,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/04.png',
      name: 'Bose® - SoundLink® Color Bluetooth Speaker',
      order_status: 'delivered',
      popularity: 98,
      price: 129.99
    },
    {
      id: 43,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Bose® - SoundLink® Color Carry Case',
      order_status: 'pending',
      popularity: 95,
      price: 24.99
    },
    {
      id: 44,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/06.png',
      name: 'Bose® - SoundLink® III Cover',
      order_status: 'on_hold',
      popularity: 76,
      price: 34.99
    },
    {
      id: 45,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Bose® - SoundLink® III Cover',
      order_status: 'canceled',
      popularity: 98,
      price: 34.99
    },
    {
      id: 46,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Bose® - SoundLink® III Cover',
      order_status: 'pending',
      popularity: 70,
      price: 34.99
    },
    {
      id: 47,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/08.png',
      name: 'Bose® - Mini Bluetooth Speaker II',
      order_status: 'pending',
      popularity: 62,
      price: 199.99
    },
    {
      id: 48,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/02.png',
      name: 'Bose® - Bluetooth Speaker II',
      order_status: 'canceled',
      popularity: 63,
      price: 199.99
    },
    {
      id: 49,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Bose® - SoundLink® Mini Bluetooth Speaker Soft Cover',
      order_status: 'on_hold',
      popularity: 90,
      price: 24.99
    },
    {
      id: 50,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/04.png',
      name: 'Bose® - Bluetooth Speaker Soft Cover',
      order_status: 'canceled',
      popularity: 98,
      price: 24.99
    },
    {
      id: 51,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Bose® - Bluetooth Speaker Soft Cover',
      order_status: 'on_hold',
      popularity: 55,
      price: 24.99
    },
    {
      id: 52,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Bose® - Bluetooth Speaker',
      order_status: 'pending',
      popularity: 53,
      price: 24.99
    },
    {
      id: 53,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Bose® - SoundLink® Mini Bluetooth Speaker Soft Cover',
      order_status: 'pending',
      popularity: 82,
      price: 24.99
    },
    {
      id: 54,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/08.png',
      name: 'Bose® - Bluetooth Speaker Travel Bag',
      order_status: 'on_hold',
      popularity: 78,
      price: 44.99
    },
    {
      id: 55,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/08.png',
      name: 'Bose® - SoundLink® Mini Soft Cover',
      order_status: 'canceled',
      popularity: 81,
      price: 24.99
    },
    {
      id: 56,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/07.png',
      name: 'Bose® - SoundLink® Mini Soft Cover',
      order_status: 'pending',
      popularity: 94,
      price: 24.99
    },
    {
      id: 57,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Bose® - Bluetooth Speaker III',
      order_status: 'pending',
      popularity: 97,
      price: 299.99
    },
    {
      id: 58,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/04.png',
      name: 'Bose® - SoundLink® Soft Cover',
      order_status: 'delivered',
      popularity: 89,
      price: 24.99
    },
    {
      id: 59,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/02.png',
      name: 'Bose® - Bluetooth Music Adapter',
      order_status: 'on_hold',
      popularity: 53,
      price: 99.99
    },
    {
      id: 60,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/04.png',
      name: 'Bowers & Wilkins - Bluetooth Speaker',
      order_status: 'canceled',
      popularity: 79,
      price: 349.98
    },
    {
      id: 61,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'BRAVEN - Balance Portable Bluetooth Speaker',
      order_status: 'on_hold',
      popularity: 82,
      price: 129.99
    },
    {
      id: 62,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
      name: 'BRAVEN - Balance Portable Bluetooth Speaker',
      order_status: 'pending',
      popularity: 80,
      price: 129.99
    },
    {
      id: 63,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/06.png',
      name: 'BRAVEN - Outdoor Speaker',
      order_status: 'pending',
      popularity: 86,
      price: 199.99
    },
    {
      id: 64,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/03.png',
      name: 'BRAVEN - BRV-X Outdoor Speaker',
      order_status: 'pending',
      popularity: 61,
      price: 199.99
    },
    {
      id: 65,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'BRAVEN - Portable Bluetooth Speaker',
      order_status: 'on_hold',
      popularity: 85,
      price: 299.99
    },
    {
      id: 66,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/02.png',
      name: 'BRAVEN - Portable Bluetooth Speaker',
      order_status: 'on_hold',
      popularity: 81,
      price: 99.99
    },
    {
      id: 67,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
      name: 'BRAVEN - Wireless Bluetooth Speaker',
      order_status: 'on_hold',
      popularity: 50,
      price: 99.99
    },
    {
      id: 68,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/02.png',
      name: 'BRAVEN - Wireless Bluetooth Speaker',
      order_status: 'delivered',
      popularity: 93,
      price: 99.99
    },
    {
      id: 69,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/03.png',
      name: 'BRAVEN - Wireless Bluetooth Speaker',
      order_status: 'pending',
      popularity: 51,
      price: 99.99
    },
    {
      id: 70,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Craig - Tower Speaker',
      order_status: 'pending',
      popularity: 77,
      price: 69.99
    },
    {
      id: 71,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/04.png',
      name: 'Craig - Portable Wireless Speaker',
      order_status: 'canceled',
      popularity: 89,
      price: 29.99
    },
    {
      id: 72,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Definitive Technology - Wireless Speaker',
      order_status: 'pending',
      popularity: 81,
      price: 399.98
    },
    {
      id: 73,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/03.png',
      name: 'Definitive Technology - Wireless Speaker',
      order_status: 'pending',
      popularity: 76,
      price: 699.98
    },
    {
      id: 74,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/08.png',
      name: 'Denon - Wireless Speaker',
      order_status: 'pending',
      popularity: 88,
      price: 399.98
    },
    {
      id: 75,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Denon - HEOS 7 Wireless Speaker',
      order_status: 'canceled',
      popularity: 100,
      price: 599.98
    },
    {
      id: 76,
      category: 'audio',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/02.png',
      name: 'ECOXGEAR - Waterproof Bluetooth Speaker',
      order_status: 'canceled',
      popularity: 52,
      price: 129.99
    },
    {
      id: 77,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/03.png',
      name: 'Fitbit - Charge HR Activity Tracker + Heart Rate (Large)',
      order_status: 'pending',
      popularity: 66,
      price: 149.99
    },
    {
      id: 78,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
      name: 'Fitbit - Charge HR Activity Tracker + Heart Rate (Large)',
      order_status: 'delivered',
      popularity: 66,
      price: 149.99
    },
    {
      id: 79,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Fitbit - Activity Tracker + Heart Rate (Large)',
      order_status: 'canceled',
      popularity: 96,
      price: 149.99
    },
    {
      id: 80,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
      name: 'Fitbit - Charge HR Activity Tracker + Heart Rate (Small)',
      order_status: 'on_hold',
      popularity: 92,
      price: 149.99
    },
    {
      id: 81,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Fitbit - Charge HR Activity Tracker + Heart Rate (Small)',
      order_status: 'delivered',
      popularity: 82,
      price: 149.99
    },
    {
      id: 82,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
      name: 'Fitbit - Activity Tracker + Heart Rate (Small)',
      order_status: 'pending',
      popularity: 100,
      price: 149.99
    },
    {
      id: 83,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
      name: 'Fitbit - Activity Tracker + Sleep Wristband',
      order_status: 'pending',
      popularity: 100,
      price: 149.99
    },
    {
      id: 84,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/02.png',
      name: 'Fitbit - Activity Tracker (Large)',
      order_status: 'pending',
      popularity: 52,
      price: 129.99
    },
    {
      id: 85,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Fitbit - Charge Wireless Activity Tracker (Large)',
      order_status: 'on_hold',
      popularity: 51,
      price: 129.99
    },
    {
      id: 86,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/04.png',
      name: 'Fitbit - Charge Wireless Activity Tracker (Large)',
      order_status: 'pending',
      popularity: 80,
      price: 129.99
    },
    {
      id: 87,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/02.png',
      name: 'Fitbit - Charge Wireless Activity Tracker (Small)',
      order_status: 'on_hold',
      popularity: 99,
      price: 129.99
    },
    {
      id: 88,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/07.png',
      name: 'Fitbit - Activity Tracker (Small)',
      order_status: 'on_hold',
      popularity: 75,
      price: 129.99
    },
    {
      id: 89,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/07.png',
      name: 'Fitbit - Charge Wireless Activity Tracker (Small)',
      order_status: 'pending',
      popularity: 80,
      price: 129.99
    },
    {
      id: 90,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/07.png',
      name: 'Fitbit - Charging Cable for Activity Trackers',
      order_status: 'delivered',
      popularity: 50,
      price: 19.99
    },
    {
      id: 91,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Fitbit - Clip for Activity and Sleep Trackers',
      order_status: 'delivered',
      popularity: 57,
      price: 14.99
    },
    {
      id: 92,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Fitbit - Clip for Wireless Activity and Sleep Trackers',
      order_status: 'on_hold',
      popularity: 80,
      price: 14.99
    },
    {
      id: 93,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/03.png',
      name: 'Fitbit - Clip for Zip Wireless Activity Trackers',
      order_status: 'canceled',
      popularity: 78,
      price: 14.99
    },
    {
      id: 94,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
      name: 'Fitbit - Flex 1" USB Charging Cable',
      order_status: 'on_hold',
      popularity: 81,
      price: 14.99
    },
    {
      id: 95,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/03.png',
      name: 'Fitbit - Flex 1" USB Charging Cable',
      order_status: 'canceled',
      popularity: 51,
      price: 14.99
    },
    {
      id: 96,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/03.png',
      name: 'Fitbit - Flex Clasp for Activity Trackers',
      order_status: 'canceled',
      popularity: 56,
      price: 4.99
    },
    {
      id: 97,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/07.png',
      name: 'Fitbit - Sleep Wristband',
      order_status: 'on_hold',
      popularity: 95,
      price: 99.99
    },
    {
      id: 98,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Fitbit - Sleep Tracker Wristband',
      order_status: 'delivered',
      popularity: 85,
      price: 99.99
    },
    {
      id: 99,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
      name: 'Fitbit - Flex Wireless Activity',
      order_status: 'pending',
      popularity: 50,
      price: 99.99
    },
    {
      id: 100,
      category: 'fitness',
      img: 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/06.png',
      name: 'Fitbit - Activity Tracker',
      order_status: 'delivered',
      popularity: 72,
      price: 99.99
    }
  ]
};

mock.onGet('/api/data-list/products').reply(() => {
  return [200, JSON.parse(JSON.stringify(data.products)).reverse()];
});

// POST : Add new Item
mock.onPost('/api/data-list/products/').reply((request) => {
  // Get event from post data
  const { item } = JSON.parse(request.data);

  const { length } = data.products;
  let lastIndex = 0;
  if (length) {
    lastIndex = data.products[length - 1].id;
  }
  item.id = lastIndex + 1;

  data.products.push(item);

  return [201, { id: item.id }];
});

// Update Product
mock.onPost(/\/api\/data-list\/products\/\d+/).reply((request) => {
  const itemId = request.url.substring(request.url.lastIndexOf('/') + 1);

  const item = data.products.find((item) => item.id === itemId);
  Object.assign(item, JSON.parse(request.data).item);

  return [200, item];
});

// DELETE: Remove Item
mock.onDelete(/\/api\/data-list\/products\/\d+/).reply((request) => {
  const itemId = request.url.substring(request.url.lastIndexOf('/') + 1);

  const itemIndex = data.products.findIndex((p) => p.id === itemId);
  data.products.splice(itemIndex, 1);
  return [200];
});
