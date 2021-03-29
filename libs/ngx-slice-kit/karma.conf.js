// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', '@angular-devkit/build-angular'],
        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],
        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },
        coverageReporter: {
            type: 'text',
            dir: require('path').join(__dirname, '../../coverage/ngx-slice-kit'),
            file: "coverage.txt",
            check: {
                global: {
                    statements: 90,
                    branches: 80,
                    functions: 90,
                    lines: 90,
                },
                // each: {
                //     statements: 80,
                //     branches: 80,
                //     functions: 80,
                //     lines: 80,
                // }
            },
            watermarks: {
                statements: [ 50, 75 ],
                functions: [ 50, 75 ],
                branches: [ 50, 75 ],
                lines: [ 50, 75 ]
            },
            reporters:[
                {type: 'html', dir:'../../coverage/ngx-slice-kit'},
                {type: 'lcovonly'},
                {type: 'text-summary'}
            ],
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        restartOnFileChange: true
    });
};
