module.exports = function( grunt ) {

    grunt.initConfig({

        pkg   : grunt.file.readJSON('package.json'),
        clean : [ "<%= pkg.environment %>/*" ],

        copy : {
            base : {
                files : [
                    {
                        expand  : true,
                        flatten : true,
                        dest    : '<%= pkg.environment %>/',
                        src     : [ 'src/*' ],
                        filter  : 'isFile'
                    }
                ]
            },
            htaccess : {
                files : [
                    {
                        expand  : true,
                        flatten : true,
                        dest    : '<%= pkg.environment %>/',
                        src     : [ 'src/.htaccess' ]
                    }
                ]
            },
            core : {
                files : [
                    {
                        expand  : true,
                        flatten : true,
                        dest    : '<%= pkg.environment %>/assets/core/',
                        cwd     : 'src/core/',
                        src     : [
                            'angular/angular.min.js',
                            'angular/angular.min.js.map',
                            'angular-route/angular-route.min.js',
                            'angular-route/angular-route.min.js.map',
                            'angular-animate/angular-animate.min.js',
                            'angular-animate/angular-animate.min.js.map',
                            'angular-sanitize/angular-sanitize.min.js',
                            'angular-sanitize/angular-sanitize.min.js.map',
                            'angular-bootstrap/ui-bootstrap.min.js',
                            'angular-bootstrap/ui-bootstrap-tpls.min.js',
                            'angular-popeye/release/popeye.min.js',
                            'underscore/underscore-min.js',
                            'underscore/underscore-min.map',
                            'jquery/dist/jquery.min.js',
                            'jquery/dist/jquery.min.map'
                        ]
                    }
                ]
            },
            material : {
                files : [
                    {
                        expand  : true,
                        flatten : false,
                        dest    : '<%= pkg.environment %>/assets/core/material/',
                        cwd     : 'src/core/material-design-icons/iconfont/',
                        src     : [ '**/*' ]
                    }
                ]
            },
            bootstrap : {
                files : [
                    {
                        expand  : true,
                        flatten : false,
                        dest    : '<%= pkg.environment %>/assets/core/bootstrap/',
                        cwd     : 'src/core/bootstrap/dist/',
                        src     : [ '**/*' ]
                    }
                ]
            },
            vendor : {
                files : [
                    {
                        expand  : true,
                        dest    : '<%= pkg.environment %>/assets/vendor/',
                        cwd     : 'src/vendor',
                        src     : [ '**' ]
                    }
                ]
            },
            views : {
                files : [
                    {
                        expand : true,
                        dest   : '<%= pkg.environment %>/views/',
                        cwd    : 'src/app/components/',
                        src    : [ '**/*.html' ]
                    }
                ]
            },
            fonts : {
                files : [
                    {
                        expand : true,
                        dest   : '<%= pkg.environment %>/assets/fonts/',
                        cwd    : 'src/assets/fonts/',
                        src    : [ '**' ]
                    }
                ]
            },
            sound : {
                files : [
                    {
                        expand : true,
                        dest   : '<%= pkg.environment %>/assets/sound/',
                        cwd    : 'src/assets/sound/',
                        src    : [ '**' ]
                    }
                ]
            },
            images : {
                files : [
                    {
                        expand : true,
                        dest   : '<%= pkg.environment %>/assets/images/',
                        cwd    : 'src/assets/images/',
                        src    : [ '**' ]
                    }
                ]
            }
        },

        concat : {
            options : {
                separator : ';',
                sourceMap : true,
                banner    : "'use strict';\n",
                process   : function(src, filepath) {
                    return '// Source: ' + filepath + '\n' +
                        src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
            dist : {
                src  : [ 'src/app/*.js', 'src/app/**/*.js' ],
                dest : '<%= pkg.environment %>/assets/app/main.js'
            }
        },

        uglify : {
            options : {
                mangle : false
            },
            core : {
                files : {
                    '<%= pkg.environment %>/assets/app/main.js' : [ '<%= pkg.environment %>/assets/app/main.js' ]
                }
            }
        },

        compass : {
            dist : {
                options : {
                    config : 'config.rb'
                }
            }
        },

        concat_css: {
            all : {
                src : ["src/assets/css/*.css"],
                dest:  "<%= pkg.environment %>/assets/css/main.css"
            }
        },

        cacheBust : {
            options : {
                encoding  : 'utf8',
                algorithm : 'md5',
                length    : 16
            },
            assets : {
                files : {
                    src : ['<%= pkg.environment %>/index.html']
                }
            }
        },

        jshint : {
            options : {
                reporter : require('jshint-stylish')
            },
            all: [
                "Gruntfile.js",
                "src/app/**/*.js"
            ]
        },

        bump : {
            options : {
                files : [ 'package.json' ],
                updateConfigs : [ ],
                commit : true,
                commitMessage : 'Release v%VERSION%',
                commitFiles : [ '-a' ],
                createTag : false,
                push : true,
                pushTo : 'origin',
                gitDescribeOptions : '--tags --always --abbrev=1 --dirty=-d',
            }
        }

    });

    grunt.loadNpmTasks( 'grunt-bower-task' );
    grunt.loadNpmTasks( 'grunt-bump' );
    grunt.loadNpmTasks( 'grunt-cache-bust' );
    grunt.loadNpmTasks( 'grunt-contrib-clean' );
    grunt.loadNpmTasks( 'grunt-contrib-concat' );
    grunt.loadNpmTasks( 'grunt-contrib-copy' );
    grunt.loadNpmTasks( 'grunt-contrib-compass' );
    grunt.loadNpmTasks( 'grunt-concat-css' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );
    grunt.loadNpmTasks( 'grunt-contrib-uglify' );

    grunt.registerTask( 'test', [
            'jshint',
            'clean',
            'copy',
            'compass',
            'concat',
            'concat_css',
            'cacheBust'
        ]
    );

    grunt.registerTask( 'build', [
        'jshint',
        'clean',
        'copy',
        'compass',
        'concat',
        'concat_css',
        'uglify',
        'cacheBust'
        ]
    );

};
