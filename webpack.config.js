module.exports = {
    entry: __dirname+'/app/app.ts',
    output: {
      path: __dirname+'/app',
      filename: 'app.bundle.js'
    },
    module: {
      rules: [
        { 
          test: /\.ts$/, 
          loader: 'awesome-typescript-loader' },
        {
          test: /\.css$/,
          loader: 'style!css'
        },
        // {
        //   test: /\.js$/,
        //   loader: 'babel-loader',
        //   exclude: /node_modules/
        // },
      ]
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    }
  };
  