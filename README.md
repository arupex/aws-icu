# aws-icu

Handles the short-commings of aws lambdas and NodeJS's requirement for ICU to be loaded at runtime

#### How it works
    You install ICU data in your project,
    when you require this module, it synchronously, copies that data to the /tmp directory and Creates AWS_INTL global
    which acts similar to the Intl global, but causes a spawn'd process which has ICU to run all your code

# Install

    node -e 'console.dir("npm install icu4c-data@"+process.config.variables.icu_ver_major+process.config.variables.icu_endianness)'
    # install what it tells you
    
    npm i aws-icu --save
    
# Usage
    // in your lambda handler js file
    require('aws-icu');
    
    //use AWS_INTL instead of INTL or set INTL = AWS_INTL

# Example Collator

    let collatorEN = new AWS_INTL.Collator('en-us');
    let collatorNB = new AWS_INTL.Collator('nb-no');
    
    let en = ['aa', 'a', 'z'].sort( (a, b) => collatorEN.compare(a,b) );
    let nb = ['aa', 'a', 'z'].sort( (a, b) => collatorNB.compare(a,b) );
    
    console.log('en_US', en, 'nb_NO',nb);
    
#### Outputs
    > en_US [ 'a', 'aa', 'z' ] nb_NO [ 'a', 'z', 'aa' ]

# Example NumberFormat
    
    let numberEN = new AWS_INTL.NumberFormat('en-us', { style : 'currency', currency : 'USD', currencyDisplay : 'symbol'});
    let numberNB = new AWS_INTL.NumberFormat('nb-no', { style : 'currency', currency : 'USD', currencyDisplay : 'symbol'});
    
    console.log('en_US', numberEN.format(7), 'nb_NO', numberNB.format(7));
 
 #### Outputs
     > en_US $7.00 nb_NO USD 7,00 
    
# Example DateTimeFormat    
    
    let dateEN = new AWS_INTL.DateTimeFormat('en-us', {year: 'numeric', month: 'numeric', day: 'numeric'});
    let dateNB = new AWS_INTL.DateTimeFormat('nb-no', {year: 'numeric', month: 'numeric', day: 'numeric'});
    
    console.log('en_US', dateEN.format(new Date()), 'nb_NO', dateNB.format(new Date()));

#### Outputs
    > en_US 8/7/2018 nb_NO 7.8.2018