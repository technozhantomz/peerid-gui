import {I18n} from 'react-redux-i18n';
import {Config} from '../utility';

/**
 * Translate the provided string.
 *
 * @param {string} val - String to be used for translation.
 * @param {object} options - Options for inline parameters.
 * @returns {string}
 */
export const translate = (val, options) => {
  if (!!options) {
    return I18n.t(val, options);
  } else {
    return I18n.t(val);
  }
};

/**
 * Wraps Promise APIs and only resolves them if useDummy: false is set in config.
 *
 * @param {*} callback
 * @returns {Promise} - Resolves promise if useDummy: false otherwise reject.
 */

export const dummyDataWrapper = (callback) => {
  return new Promise(
    (resolve, reject) => {

      if(!Config.useDummy) {
        return resolve(callback);
      } else {
        return reject('USING DUMMY DATA');
      }
    });
};

export const initConsole = () => {
  const isProduction = process.env.NODE_ENV === 'production';

  // Don't console log in production
  if(isProduction) {
    console.log = () => {};

    console.warn = () => {};

    console.info = () => {};

    console.error = () => {};
  }
};

export const desc = (a, b, orderBy) => {
  if(orderBy.includes('Date')) {
    if(Date.parse(b[orderBy]) < Date.parse(a[orderBy])) {
      return -1;
    }

    if(Date.parse(b[orderBy]) > Date.parse(a[orderBy])) {
      return -1;
    }

    return 0;
  }

  if (b[orderBy].toLowerCase() < a[orderBy].toLowerCase()) {
    return -1;
  }

  if (b[orderBy].toLowerCase() > a[orderBy].toLowerCase()) {
    return 1;
  }

  return 0;
};

export const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);

    if (order !== 0) {
      return order;
    }

    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

export const getSorting = ( order, orderBy)=> {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
};
