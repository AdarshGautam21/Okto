'use strict';

import * as _ from 'lodash';

// This function converts snake-case object to pascal-case recursively
module.exports.convertSnakeToPascal = (obj) => {
  let camelCaseObject = _.cloneDeep(obj);

  if (_.isArray(camelCaseObject)) {
    return _.map(camelCaseObject, this.convertSnakeToPascal);
  } else {
    camelCaseObject = _.mapKeys(camelCaseObject, (value, key) => {
      return _.camelCase(key);
    });

    // Recursively apply throughout object
    return _.mapValues(camelCaseObject, (value) => {
      if (_.isPlainObject(value)) {
        return this.convertSnakeToPascal(value);
      } else if (_.isArray(value)) {
        return _.map(value, this.convertSnakeToPascal);
      } else {
        return value;
      }
    });
  }
};
