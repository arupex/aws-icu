require('./index');

let collatorEN = new AWS_INTL.Collator('en-us');
let collatorNB = new AWS_INTL.Collator('nb-no');

let en = ['aa', 'a', 'z'].sort( (a, b) => collatorEN.compare(a,b) );
let nb = ['aa', 'a', 'z'].sort( (a, b) => collatorNB.compare(a,b) );

console.log('en_US', en, 'nb_NO',nb);


let numberEN = new AWS_INTL.NumberFormat('en-us', { style : 'currency', currency : 'USD', currencyDisplay : 'symbol'});
let numberNB = new AWS_INTL.NumberFormat('nb-no', { style : 'currency', currency : 'USD', currencyDisplay : 'symbol'});

console.log('en_US', numberEN.format(7), 'nb_NO', numberNB.format(7));




let dateEN = new AWS_INTL.DateTimeFormat('en-us', {year: 'numeric', month: 'numeric', day: 'numeric'});
let dateNB = new AWS_INTL.DateTimeFormat('nb-no', {year: 'numeric', month: 'numeric', day: 'numeric'});

console.log('en_US', dateEN.format(new Date()), 'nb_NO', dateNB.format(new Date()));