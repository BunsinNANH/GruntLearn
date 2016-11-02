module.exports = function (grunt) {
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.initConfig({
		dirs: {
			css: 'css',
			js: 'js',
			build: 'build',
			image: {
				src: 'images',
				dest: 'public/images'
			},
			font: {
				src: 'fonts',
				dest: 'public/fonts'
			},
			sass: 'sass'


		},
		compass: {
			dist: {
				options: {
					sass: 'sass',
					css: '<%= dirs.build %>/sass',
				}
			},
		},
		concat: {
			js: {
				src: ['<%= dirs.js %>/script1.js', '<%= dirs.js %>/script2.js'],
				dest: '<%= dirs.build %>/scripts.js',
			},
			css: {
				src: ['<%= dirs.css %>/style1.css', '<%= dirs.css %>/style2.css', '<%= dirs.build %>/sass/custom.css'],
				dest: '<%= dirs.build %>/styles.css',
			},
		},
		copy: {
			fonts: {
				files: [{
					expand: true,
					flatten: true,
					src: '<%= dirs.font.src %>/*.eot',
					dest: '<%= dirs.font.dest %>'
				}]
			},
			images: {
				files: [{
					expand: true,
					flatten: true,
					src: '<%= dirs.image.src %>/*.jpg',
					dest: '<%= dirs.image.dest %>'
				}]
			}
		},
		cssmin: {
			screen: {
				src: '<%= dirs.build %>/styles.css',
				dest: '<%= dirs.build %>/styles.min.css'
			}
		},
		uglify: {
			js: {
				src: '<%= dirs.build %>/scripts.js',
				dest: '<%= dirs.build %>/scripts.min.js'
				}
		},
		clean: {
			css: '<%= dirs.build %>/sass/'
		},
		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['build']
			},
			sass: {
				files: ['<%= dirs.sass %>/**/*.scss'],
				tasks: ['compass', 'cssmin', 'clean:css']
			},
			js: {
				files: ['<%= dirs.js %>/**/*.js'],
				tasks: ['concat:js', 'uglify:js', 'clean:js']
			}
		}
	});
	grunt.registerTask('default', ['build', 'watch']);

	grunt.registerTask('build', ['compass', 'concat', 'copy', 'cssmin', 'uglify', 'clean', 'watch']);
};
