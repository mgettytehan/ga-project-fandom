const hbs = require('hbs');

hbs.registerHelper('selectedValue',
    (valueOne, valueTwo) => {
        if (valueOne === undefined || valueTwo === undefined)
            return '';
        if (valueOne == valueTwo)
            return 'selected="selected"';
        else
            return '';
    }
);

module.exports = {
    hbs
};