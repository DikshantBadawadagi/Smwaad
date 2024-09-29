export default(results=[], action) => {
    switch (action.type) {
        case 'FETCH_ALL_RESULTS':
            return action.payload;
        case 'CREATE_RESULTS':
            return [...results, action.payload];
        default:
            return results;
    }
}