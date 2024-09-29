export default (questions = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL'://changes krna hai yaha pe
            return action.payload;
        case 'CREATE':
            return [...questions, action.payload];
        default:
            return questions;
    }
}