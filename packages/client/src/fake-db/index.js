import mock from './mock';

import './data/user/index';

mock.onAny().passThrough(); // forwards the matched request over network
