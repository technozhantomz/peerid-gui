import {createSelector} from 'reselect';

const getCurrentAccount = (state) => state.getIn(['profiles', 'currentAccount']);


const CommonSelecter = {
  getCurrentAccount
};

export default CommonSelecter;