import { AUTHENTIFICATED, UNAUTHENTIFICATED } from '../actions/authhorization';

export default function (state = [], action){
    switch(action.type){
        case UNAUTHENTIFICATED:  
            // if a user is unauthentificated than we will reset some roles. now its visitor
            return [];
        
        case AUTHENTIFICATED: 
            // if a user is authentificated we can assing a role to it
            return action.scopes;
            
        default:
            return state;    
    }
}
