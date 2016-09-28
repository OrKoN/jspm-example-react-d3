# How To

- `npm install -g jspm@beta`
- `mkdir jspm-example-react-d3`
- `cd jspm-example-react-d3`
- `jspm init .`
- `jspm install react react-dom`
- `jspm install --dev npm:babel-plugin-transform-react-jsx core-js`
- `touch index.html` and copy content
- `mkdir src`
- `touch src/MainComponent.js` and copy content
- `touch src/app.js` and copy content
- add the babelOptions to `jspm.config.js`

    ```
    packages: {
      "app": {
        "main": "app.js",
        "meta": {
          "*.js": {
            "loader": "plugin-babel",
            "babelOptions": {
              "plugins": [
                "babel-plugin-transform-react-jsx"
              ]
            }
          }
        }
      }
    }
    ```

- `jspm install d3@3.5.17`
- `http-server .`
- open http://127.0.0.1:8080/

