import Vue from 'vue';

Vue.filter('capitalize', value => {
  if (!value) return '';
  value = value.toString();
  const arr = value.split(' ');
  const capitalized_array = [];
  arr.forEach(word => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    capitalized_array.push(capitalized);
  });
  return capitalized_array.join(' ');
});

Vue.filter('title', (value, replacer = '_') => {
  if (!value) return '';
  value = value.toString();

  const arr = value.split(replacer);
  const capitalized_array = [];
  arr.forEach(word => {
    const capitalized = word.charAt(0).toUpperCase() + word.slice(1);
    capitalized_array.push(capitalized);
  });
  return capitalized_array.join(' ');
});

Vue.filter('truncate', (value, limit) => value.substring(0, limit));

Vue.filter('tailing', (value, tail) => value + tail);

Vue.filter('time', (value, is24HrFormat = false) => {
  if (value) {
    const date = new Date(Date.parse(value));
    let hours = date.getHours();
    const min = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    if (!is24HrFormat) {
      const time = hours > 12 ? 'AM' : 'PM';
      hours = hours % 12 || 12;
      return `${hours}:${min} ${time}`;
    }
    return `${hours}:${min}`;
  }
});

Vue.filter('date', (value, fullDate = false) => {
  value = String(value);
  const date = value.slice(8, 10).trim();
  const month = value.slice(4, 7).trim();
  const year = value.slice(11, 15);

  if (!fullDate) return `${date} ${month}`;
  return `${date} ${month} ${year}`;
});

Vue.filter('month', (val, showYear = true) => {
  val = String(val);

  const regx = /\w+\s(\w+)\s\d+\s(\d+)./;
  if (!showYear) {
    return regx.exec(val)[1];
  }
  return `${regx.exec(val)[1]} ${regx.exec(val)[2]}`;
});

Vue.filter('csv', value => value.join(', '));

Vue.filter('filter_tags', value => value.replace(/<\/?[^>]+(>|$)/g, ''));

Vue.filter('k_formatter', num => (num > 999 ? `${(num / 1000).toFixed(1)}k` : num));
