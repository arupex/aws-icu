'use strict';

const spawn = require('child_process').spawnSync;

let destination = '/tmp/icu4c-data';
let source = process.env.LAMBDA_TASK_ROOT?`${process.env.LAMBDA_TASK_ROOT}/node_modules/icu4c-data`: `./node_modules/icu4c-data`;


let cp = spawn('cp', ['-a',source, destination], {});
if(process.env.DEBUG) {
    console.log('aws-icu: cp', cp.stdout.toString('utf8'), cp.stderr.toString('utf8'));
}

let cmd = (deflt, str) => {
    let child = {stdout : deflt };
    try {
        child = spawn('node', [
            `--icu-data-dir=${destination}`,
            '-e',
            `"console.log(${str})"`
        ], {
            cwd: process.cwd(),
            shell: true,
            env: process.env,
            stdio: 'pipe',
            encoding: 'utf-8',
            detached: true,
        });
        if(process.env.DEBUG) {
            console.log('aws-icu: child stdout', child.stdout.toString('utf8').replace('\n', ''));
            console.log('aws-icu: child stderr', child.stderr.toString('utf8').replace('\n', ''));
        }
    }
    catch(e){}

    return child.stdout.toString('utf8').replace('\n', '');
};

const safeJSON = (js) => { return JSON.stringify(js||{}, null, 0).replace(/"/g, "\\\"");};

class Collator {

    constructor (locale, options) {
        this.locale = locale;
        this.options = options;
    }

    compare (a, b) {
        return parseInt(cmd(new Intl.Collator(this.locale, this.options).compare(a,b), `new Intl.Collator('${this.locale}', ${safeJSON(this.options)}).compare('${a}','${b}')`));
    }

}

class DateTimeFormat {

    constructor (locale, options) {
        this.locale = locale;
        this.options = options;
    }

    format(date) {
        return cmd(new Intl.DateTimeFormat(this.locale, this.options).format(date), `new Intl.DateTimeFormat('${this.locale}', ${safeJSON(this.options)}).format(new Date(${safeJSON(date)}))`);
    }
}

class NumberFormat {

    constructor (locale, options) {
        this.locale = locale;
        this.options = options;
    }

    format(number) {
        return cmd(new Intl.NumberFormat(this.locale, this.options).format(number), `new Intl.NumberFormat('${this.locale}', ${safeJSON(this.options)}).format(${number})`);
    }
}

global.AWS_INTL = {
    Collator : Collator,
    DateTimeFormat : DateTimeFormat,
    NumberFormat : NumberFormat,
};