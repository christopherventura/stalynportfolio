module.exports = {
  entry: [
    './react/src/index.js'
  ],
  output: {
    path: __dirname,
    publicPath: 'http://localhost:8080/assets',
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: [
        	'react',
        	'es2015',
        	'stage-0'
        ],
        plugins: [
		  	'react-html-attrs',
		  	'transform-class-properties',
		  	'transform-decorators-legacy'
  		]
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './react/'
  }
};
