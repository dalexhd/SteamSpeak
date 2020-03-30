import mock from '@/fake-db/mock';

const data = {
  users: [
    {
      id: 268,
      username: 'adoptionism744',
      avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg'),
      email: 'angelo@sashington.com',
      name: 'Angelo Sashington',
      dob: '28 January 1998',
      gender: 'male',
      country: 'Bolivia',
      role: 'admin',
      status: 'active',
      is_verified: true,
      department: 'sales',
      company: 'WinDon Technologies Pvt Ltd',
      mobile: '+65958951757',
      website: 'https://rowboat.com/insititious/Angelo',
      languages_known: ['English', 'Arabic'],
      contact_options: ['email', 'message', 'phone'],
      location: {
        add_line_1: 'A-65, Belvedere Streets',
        add_line_2: '',
        post_code: '1868',
        city: 'New York',
        state: 'New York',
        country: 'United States'
      },
      social_links: {
        twitter: 'https://twitter.com/adoptionism744',
        facebook: 'https://www.facebook.com/adoptionism664',
        instagram: 'https://www.instagram.com/adopt-ionism744/',
        github: 'https://github.com/madop818',
        codepen: 'https://codepen.io/adoptism243',
        slack: '@adoptionism744'
      },
      permissions: {
        users: {
          read: true,
          write: false,
          create: false,
          delete: false
        },
        posts: {
          read: true,
          write: true,
          create: true,
          delete: true
        },
        comments: {
          read: true,
          write: false,
          create: true,
          delete: false
        }
      }
    },
    {
      id: 269,
      username: 'demodulation463',
      avatar: require('@/assets/images/portrait/small/avatar-s-2.jpg'),
      email: 'rubi@ortwein.com',
      name: 'Rubi Ortwein',
      country: 'Syria',
      role: 'user',
      status: 'blocked',
      is_verified: false,
      department: 'development'
    },
    {
      id: 270,
      username: 'undivorced341',
      avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg'),
      email: 'donnette@charania.com',
      name: 'Donnette Charania',
      country: 'Iraq',
      role: 'staff',
      status: 'deactivated',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 271,
      username: 'bumbo426',
      avatar: require('@/assets/images/portrait/small/avatar-s-12.jpg'),
      email: 'ardith@duffett.com',
      name: 'Ardith Duffett',
      country: 'Estonia',
      role: 'user',
      status: 'active',
      is_verified: false,
      department: 'sales'
    },
    {
      id: 272,
      username: 'ectodactylism214',
      avatar: require('@/assets/images/portrait/small/avatar-s-16.jpg'),
      email: 'antone@berman.com',
      name: 'Antone Berman',
      country: 'India',
      role: 'user',
      status: 'blocked',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 273,
      username: 'panathenaic825',
      avatar: require('@/assets/images/portrait/small/avatar-s-18.jpg'),
      email: 'maryann@gour.com',
      name: 'Maryann Gour',
      country: 'Solomon Islands',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 274,
      username: 'reptilious612',
      avatar: require('@/assets/images/portrait/small/avatar-s-7.jpg'),
      email: 'holli@vanduyne.com',
      name: 'Holli Vanduyne',
      country: 'Lebanon',
      role: 'staff',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 275,
      username: 'candid910',
      avatar: require('@/assets/images/portrait/small/avatar-s-26.jpg'),
      email: 'juanita@sartoris.com',
      name: 'Juanita Sartoris',
      country: 'Papua New Guinea',
      role: 'staff',
      status: 'active',
      is_verified: true,
      department: 'management'
    },
    {
      id: 276,
      username: 'ferrotungsten928',
      avatar: require('@/assets/images/portrait/small/avatar-s-20.jpg'),
      email: 'lia@morga.com',
      name: 'Lia Morga',
      country: 'Malaysia',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'development'
    },
    {
      id: 277,
      username: 'fibered345',
      avatar: require('@/assets/images/portrait/small/avatar-s-14.jpg'),
      email: 'theo@quatrevingt.com',
      name: 'Theo Quatrevingt',
      country: 'Nepal',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 278,
      username: 'nonenclosure246',
      avatar: require('@/assets/images/portrait/small/avatar-s-10.jpg'),
      email: 'lynwood@flud.com',
      name: 'Lynwood Flud',
      country: 'Russia',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 279,
      username: 'uncandied531',
      avatar: require('@/assets/images/portrait/small/avatar-s-13.jpg'),
      email: 'kaitlin@kahola.com',
      name: 'Kaitlin Kahola',
      country: 'Latvia',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 280,
      username: 'errancy403',
      avatar: require('@/assets/images/portrait/small/avatar-s-4.jpg'),
      email: 'alvin@car.com',
      name: 'Alvin Car',
      country: 'Yemen',
      role: 'admin',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 281,
      username: 'renillidae759',
      avatar: require('@/assets/images/portrait/small/avatar-s-16.jpg'),
      email: 'justin@jacquelin.com',
      name: 'Justin Jacquelin',
      country: 'Turkmenistan',
      role: 'user',
      status: 'blocked',
      is_verified: true,
      department: 'management'
    },
    {
      id: 282,
      username: 'jellylike89',
      avatar: require('@/assets/images/portrait/small/avatar-s-20.jpg'),
      email: 'chloe@tague.com',
      name: 'Chloe Tague',
      country: 'Pakistan',
      role: 'staff',
      status: 'active',
      is_verified: true,
      department: 'development'
    },
    {
      id: 283,
      username: 'ocular772',
      avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
      email: 'zola@tauarez.com',
      name: 'Zola Tauarez',
      country: 'Dominica',
      role: 'admin',
      status: 'deactivated',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 284,
      username: 'oxgang923',
      avatar: require('@/assets/images/portrait/small/avatar-s-11.jpg'),
      email: 'wm@cieszynski.com',
      name: 'Wm Cieszynski',
      country: 'South Korea',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 285,
      username: 'ideationally882',
      avatar: require('@/assets/images/portrait/small/avatar-s-1.jpg'),
      email: 'hope@mobus.com',
      name: 'Hope Mobus',
      country: 'United States of America',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 286,
      username: 'cynomorphous587',
      avatar: require('@/assets/images/portrait/small/avatar-s-25.jpg'),
      email: 'lee@wernimont.com',
      name: 'Lee Wernimont',
      country: 'South Africa',
      role: 'admin',
      status: 'active',
      is_verified: true,
      department: 'development'
    },
    {
      id: 287,
      username: 'windtight501',
      avatar: require('@/assets/images/portrait/small/avatar-s-3.jpg'),
      email: 'myesha@denman.com',
      name: 'Myesha Denman',
      country: 'Cyprus',
      role: 'staff',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 288,
      username: 'strongylate147',
      avatar: require('@/assets/images/portrait/small/avatar-s-21.jpg'),
      email: 'cornell@roszell.com',
      name: 'Cornell Roszell',
      country: 'Algeria',
      role: 'admin',
      status: 'active',
      is_verified: true,
      department: 'development'
    },
    {
      id: 289,
      username: 'reblade348',
      avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
      email: 'vernon@ogrodowicz.com',
      name: 'Vernon Ogrodowicz',
      country: 'Botswana',
      role: 'admin',
      status: 'deactivated',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 290,
      username: 'trapping909',
      avatar: require('@/assets/images/portrait/small/avatar-s-26.jpg'),
      email: 'rosy@litza.com',
      name: 'Rosy Litza',
      country: 'Iran',
      role: 'staff',
      status: 'active',
      is_verified: true,
      department: 'development'
    },
    {
      id: 291,
      username: 'associatedness456',
      avatar: require('@/assets/images/portrait/small/avatar-s-16.jpg'),
      email: 'carl@lano.com',
      name: 'Carl Lano',
      country: 'Japan',
      role: 'user',
      status: 'blocked',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 292,
      username: 'deformable333',
      avatar: require('@/assets/images/portrait/small/avatar-s-5.jpg'),
      email: 'jamika@overlee.com',
      name: 'Jamika Overlee',
      country: 'Colombia',
      role: 'admin',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 293,
      username: 'abaptiston684',
      avatar: require('@/assets/images/portrait/small/avatar-s-10.jpg'),
      email: 'lyle@pytko.com',
      name: 'Lyle Pytko',
      country: 'Somalia',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'management'
    },
    {
      id: 294,
      username: 'neglector719',
      avatar: require('@/assets/images/portrait/small/avatar-s-20.jpg'),
      email: 'latoria@josef.com',
      name: 'Latoria Josef',
      country: 'Lithuania',
      role: 'staff',
      status: 'active',
      is_verified: true,
      department: 'development'
    },
    {
      id: 295,
      username: 'perameloid596',
      avatar: require('@/assets/images/portrait/small/avatar-s-18.jpg'),
      email: 'tennille@draft.com',
      name: 'Tennille Draft',
      country: 'Somalia',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 296,
      username: 'fetoplacental529',
      avatar: require('@/assets/images/portrait/small/avatar-s-20.jpg'),
      email: 'bernadette@ludovici.com',
      name: 'Bernadette Ludovici',
      country: 'Cameroon',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'development'
    },
    {
      id: 297,
      username: 'interdiffusion271',
      avatar: require('@/assets/images/portrait/small/avatar-s-8.jpg'),
      email: 'mui@melching.com',
      name: 'Mui Melching',
      country: 'Iran',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 298,
      username: 'vernacularize342',
      avatar: require('@/assets/images/portrait/small/avatar-s-18.jpg'),
      email: 'mitsue@houlahan.com',
      name: 'Mitsue Houlahan',
      country: 'Malawi',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 299,
      username: 'sassenach8',
      avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
      email: 'elsa@neubert.com',
      name: 'Elsa Neubert',
      country: 'Togo',
      role: 'staff',
      status: 'deactivated',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 300,
      username: 'diplantidian91',
      avatar: require('@/assets/images/portrait/small/avatar-s-19.jpg'),
      email: 'kandice@mizelle.com',
      name: 'Kandice Mizelle',
      country: 'Greece',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 301,
      username: 'precognizant796',
      avatar: require('@/assets/images/portrait/small/avatar-s-22.jpg'),
      email: 'damian@hayzlett.com',
      name: 'Damian Hayzlett',
      country: 'St. Lucia',
      role: 'staff',
      status: 'active',
      is_verified: true,
      department: 'management'
    },
    {
      id: 302,
      username: 'submaster902',
      avatar: require('@/assets/images/portrait/small/avatar-s-16.jpg'),
      email: 'aundrea@stempel.com',
      name: 'Aundrea Stempel',
      country: 'Cyprus',
      role: 'user',
      status: 'blocked',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 303,
      username: 'ladytide97',
      avatar: require('@/assets/images/portrait/small/avatar-s-21.jpg'),
      email: 'shiloh@spielmaker.com',
      name: 'Shiloh Spielmaker',
      country: 'Palestine',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'development'
    },
    {
      id: 304,
      username: 'prayingly678',
      avatar: require('@/assets/images/portrait/small/avatar-s-24.jpg'),
      email: 'terese@dyreson.com',
      name: 'Terese Dyreson',
      country: 'Sao Tome and Principe',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'management'
    },
    {
      id: 305,
      username: 'unclotted302',
      avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
      email: 'vashti@kilton.com',
      name: 'Vashti Kilton',
      country: 'Portugal',
      role: 'user',
      status: 'deactivated',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 306,
      username: 'unfascinating985',
      avatar: require('@/assets/images/portrait/small/avatar-s-19.jpg'),
      email: 'carter@mendes.com',
      name: 'Carter Mendes',
      country: 'Armenia',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 307,
      username: 'gardenwise712',
      avatar: require('@/assets/images/portrait/small/avatar-s-24.jpg'),
      email: 'helene@madden.com',
      name: 'Helene Madden',
      country: 'Finland',
      role: 'staff',
      status: 'active',
      is_verified: true,
      department: 'development'
    },
    {
      id: 308,
      username: 'interagree870',
      avatar: require('@/assets/images/portrait/small/avatar-s-13.jpg'),
      email: 'ashton@calderone.com',
      name: 'Ashton Calderone',
      country: 'Italy',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 309,
      username: 'brutification848',
      avatar: require('@/assets/images/portrait/small/avatar-s-14.jpg'),
      email: 'robert@lyster.com',
      name: 'Robert Lyster',
      country: 'Turkey',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 310,
      username: 'unhypocritically536',
      avatar: require('@/assets/images/portrait/small/avatar-s-22.jpg'),
      email: 'delma@mewbourn.com',
      name: 'Delma Mewbourn',
      country: 'Honduras',
      role: 'staff',
      status: 'deactivated',
      is_verified: false,
      department: 'development'
    },
    {
      id: 311,
      username: 'tarentine951',
      avatar: require('@/assets/images/portrait/small/avatar-s-17.jpg'),
      email: 'ja@alaibilla.com',
      name: 'Ja Alaibilla',
      country: 'Italy',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 312,
      username: 'mountainlike2',
      avatar: require('@/assets/images/portrait/small/avatar-s-22.jpg'),
      email: 'delinda@rosentrance.com',
      name: 'Delinda Rosentrance',
      country: 'Guinea',
      role: 'user',
      status: 'active',
      is_verified: true,
      department: 'development'
    },
    {
      id: 313,
      username: 'zoetic150',
      avatar: require('@/assets/images/portrait/small/avatar-s-18.jpg'),
      email: 'danae@demeter.com',
      name: 'Danae Demeter',
      country: 'Gambia',
      role: 'user',
      status: 'deactivated',
      is_verified: true,
      department: 'sales'
    },
    {
      id: 314,
      username: 'addlepate37',
      avatar: require('@/assets/images/portrait/small/avatar-s-14.jpg'),
      email: 'kattie@joffrion.com',
      name: 'Kattie Joffrion',
      country: 'Albania',
      role: 'user',
      status: 'blocked',
      is_verified: true,
      department: 'management'
    },
    {
      id: 315,
      username: 'pollinate51',
      avatar: require('@/assets/images/portrait/small/avatar-s-19.jpg'),
      email: 'in@stjohns.com',
      name: 'In Stjohns',
      country: 'North Korea',
      role: 'user',
      status: 'active',
      is_verified: false,
      department: 'sales'
    },
    {
      id: 316,
      username: 'tournefortian626',
      avatar: require('@/assets/images/portrait/small/avatar-s-2.jpg'),
      email: 'van@laferney.com',
      name: 'Van Laferney',
      country: 'Finland',
      role: 'staff',
      status: 'active',
      is_verified: true,
      department: 'development'
    },
    {
      id: 317,
      username: 'aspersively497',
      avatar: require('@/assets/images/portrait/small/avatar-s-6.jpg'),
      email: 'sylvia@maharrey.com',
      name: 'Sylvia Maharrey',
      country: 'Turkmenistan',
      role: 'staff',
      status: 'deactivated',
      is_verified: true,
      department: 'sales'
    }
  ]
};

mock.onGet('/api/user-management/users').reply(() => {
  return [200, JSON.parse(JSON.stringify(data.users)).reverse()];
});

// GET: Fetch Single User Details
mock.onGet(/\/api\/user-management\/users\/\d+/).reply((request) => {
  const userId = request.url.substring(request.url.lastIndexOf('/') + 1);

  const user = data.users.find((user) => user.id === userId);

  return user ? [200, JSON.parse(JSON.stringify(user))] : [404];
});

// // POST : Add new Item
// mock.onPost("/api/data-list/products/").reply((request) => {

//   // Get event from post data
//   let item = JSON.parse(request.data).item

//   const length = data.products.length
//   let lastIndex = 0
//   if(length){
//     lastIndex = data.products[length - 1].id
//   }
//   item.id = lastIndex + 1

//   data.products.push(item)

//   return [201, {id: item.id}]
// })

// // Update Product
// mock.onPost(/\/api\/data-list\/products\/\d+/).reply((request) => {

//   const itemId = request.url.substring(request.url.lastIndexOf("/")+1)

//   let item = data.products.find((item) => item.id == itemId)
//   Object.assign(item, JSON.parse(request.data).item)

//   return [200, item]
// })

// // DELETE: Remove Item
mock.onDelete(/\/api\/user-management\/users\/\d+/).reply((request) => {
  const userId = request.url.substring(request.url.lastIndexOf('/') + 1);

  const itemIndex = data.users.findIndex((p) => p.id === userId);
  data.users.splice(itemIndex, 1);
  return [200];
});
