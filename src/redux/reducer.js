import { CAMPSITES, CAMPSTIES } from '../Shared/campsites';
import { COMMENTS } from '../Shared/comments';
import { PARTNERS } from '../Shared/partners';
import { PROMOTIONS } from '../Shared/promotions';

export const initialState = {
    campsites: CAMPSITES,
    comments: COMMENTS,
    partners: PARTNERS,
    promotions: PROMOTIONS
};

export const Reducer = (state = initialState, action) => {
    return state;
};