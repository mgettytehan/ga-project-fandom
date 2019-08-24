const hbs = require('hbs');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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

hbs.registerHelper('displayDate',
    fullDate => {
        const dateString =  `${months[fullDate.getMonth()]} ${fullDate.getDay()} ${fullDate.getFullYear()}`
        return dateString;
    }
);

module.exports = {
    hbs
};