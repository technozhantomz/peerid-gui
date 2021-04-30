import {fromJS} from 'immutable';
import * as actionTypes from '../actions/actions';
import config from '../config';

let initialState = fromJS({
    isOpen: [], //for active default menu
    isTrigger: [], //for active default menu, set blank for horizontal
    ...config
});

export default (state = initialState, action) => {
    let trigger = [];
    let open = [];

    switch (action.type) {
        case actionTypes.COLLAPSE_MENU:
          return state.merge({
                collapseMenu: state.get('collapseMenu') ? false : true
            });
        case actionTypes.COLLAPSE_TOGGLE:
            if (action.menu.type === 'sub') {
                open = state.get('isOpen');
                trigger = state.get('isTrigger');

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }

                if (triggerIndex === -1) {
                    open = [...open, action.menu.id];
                    trigger = [...trigger, action.menu.id];
                }
            } else {
                open = state.get('isOpen');
                const triggerIndex = (state.get('isTrigger')).indexOf(action.menu.id);
                trigger = (triggerIndex === -1) ? [action.menu.id] : [];
                open = (triggerIndex === -1) ? [action.menu.id] : [];
            }

            return state.merge({
                isOpen: open,
                isTrigger: trigger
            });
        case actionTypes.NAV_CONTENT_LEAVE:
            return state.merge({
                isOpen: open,
                isTrigger: trigger,
            });
        case actionTypes.NAV_COLLAPSE_LEAVE:
            if (action.menu.type === 'sub') {
                open = state.get('isOpen');
                trigger = state.get('isTrigger');

                const triggerIndex = trigger.indexOf(action.menu.id);
                if (triggerIndex > -1) {
                    open = open.filter(item => item !== action.menu.id);
                    trigger = trigger.filter(item => item !== action.menu.id);
                }
                return state.merge({
                    isOpen: open,
                    isTrigger: trigger,
                });
            }
            return state;
        case actionTypes.CHANGE_LAYOUT:
            return state.merge({
                layout: action.layout
            });
        default:
            return state;
    }
};
