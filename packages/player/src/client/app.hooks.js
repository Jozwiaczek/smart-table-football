import removeFieldFromData from './hooks/removeFieldFromData';
import parsMongoDbQueries from './hooks/parsMongoDbQueries';
import parsMongoDbRegexQueries from './hooks/parsMongoDbRegexQueries';
import mapQuery from './hooks/mapQuery';
import attachKind from './hooks/attachKind';

export default {
  before: {
    all: [],
    find: [mapQuery(), parsMongoDbQueries(), parsMongoDbRegexQueries()],
    get: [],
    create: [
      removeFieldFromData('_id'),
      removeFieldFromData('resetToken'),
      removeFieldFromData('resetShortToken'),
      removeFieldFromData('resetExpires'),
    ],
    update: [],
    patch: [attachKind()],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
