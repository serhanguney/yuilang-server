const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: './src/app.ts',
	target: 'node',
	output: {
		filename: 'app.js',
		path: path.join(__dirname, 'build')
	},
	externals: [nodeExternals()],
	resolve: {
		extensions: ['.ts', '.js', '.json'],
		symlinks: false
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			}
		]
	},
	node: {
		__dirname: false,
		__filename: false
	}
};
