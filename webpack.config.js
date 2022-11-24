const path = require('path')
module.exports = {
    entry: {
        'content-script': path.join(__dirname, 'src/content-script.ts'),
        'inject': path.join(__dirname, 'src/inject.ts'),
        'background': path.join(__dirname, 'src/background.ts'),
    },
    mode: "development",
    devtool: 'inline-source-map',
    output: {
        path: path.join(__dirname, "dist"),
        filename: "[name].js",
    },
    resolve: {
        extensions: [".ts", ".js", '.tsx', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            sourceMap: true
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            sourceMap: true
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
}