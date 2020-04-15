import axios from '@/axios';

const MockAdapter = require('axios-mock-adapter');

const mock = new MockAdapter(axios); // This sets the mock adapter on the default instance

export default mock;
