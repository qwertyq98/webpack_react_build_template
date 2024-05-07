# Шаблон сборки React-приложений при помощи Webpack

### 1. Установка зависимостей:
- Установка webpack, webpack-cli, webpack-dev-server.
- Установка typescript, react, react-dom.
### 2. Настройка TypeScript:
- Создание файла tsconfig.json с основными настройками для TypeScript.
- Использование опций compilerOptions для настройки компиляции TypeScript.
- Добавление ts-loader в конфигурацию Webpack для обработки TypeScript-файлов.
### 3. Настройка Dev Server:
- Настройка webpack-dev-server для удобной разработки с функцией hot-reloading.
### 4. Обработка стилей:
- Включение поддержки стилей и препроцессора Sass.
- Добавление поддержки CSS-модулей для изоляции стилей в компонентах.
### 5. Разделение на dev- и prod-режимы запуска сборки:
- Включение оптимизаций и минификации кода в режиме prod.
- Корректная работа с React в режиме dev.
### 6. Дополнительные настройки:
- Работа с изображениями, шрифтами и другими ресурсами.
- Использование плагинов Webpack для различных задач.

## Начальная настройка 

- `npm init --yes` - создать package.json
- `npm i webpack --save-dev` - установить последнюю версию
- `npm i webpack-cli -D` - обёртка для запуска Webpack из командной строки, Command Line Interface
- `npm install react react-dom` - установит пакеты react и react-dom
- если в приложении используются библиотеки, которые не поддерживают типизацию по умолчанию, нужно установить набор типов для этой библиотеки. Как правило, это npm пакет `@types/название-библиотеки`. Для корректной работы этого приложения - набор типов для React `@types/node @types/react @types/react-dom`. Команда `npm install -D @types/node @types/react @types/react-dom`
- `npm install -D typescript ts-loader` - установит сам typescript и лоадер для работы ts-файлов в сборке
- `npm i webpack-dev-server@4.15.1 -D` - добавит локальный cервер для разработки

## Базовый файл конфигурации Webpack

```javascript
const path = require('path');
// Импортируем пакет path

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    path: path.resolve(__dirname, './dist'), //путь и название директории, где расположится скомпилированный проект.
    filename: 'bundle.js',  //название бандла. Бандл — скомпилированный JavaScript.
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [ ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
 
  devServer: {
      static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
        compress: true, // это ускорит загрузку в режиме разработки
        port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
        open: true, // сайт будет открываться сам при запуске npm run dev
        hot: true,
  },
};

//module.exports — это синтаксис экспорта в Node.js
```

## Обработка HTML

- `npm install -D html-webpack-plugin` - генерирует для html-файл по шаблону при сборке

webpack.config.js
```javascript
    const HTMLWebpackPlugins = require('html-webpack-plugin');
    ...
    plugins: [
        new HTMLWebpackPlugins({
            template: path.resolve(__dirname, 'public/index.html')
        }),
    ]
```

- `npm i clean-webpack-plugin --save-dev` - очищает папку dist плагином CleanWebpackPlugin

webpack.config.js
``` javascript
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин

plugins: [
    new CleanWebpackPlugin(), // использовали плагин
]; 
```

## Установка библиотеки clsx 

- `npm install clsx` - установка библиотеки clsx 

## Настройка обработки SCSS 

- `npm install -D css-loader mini-css-extract-plugin postcss-loader autoprefixer cssnano style-loader sass sass-loader` - пакеты, необходимые для работы со стилями приложения и возможность использования препроцессора Sass

`css-loader` нужен, чтобы научить «Вебпак» работать с CSS.
`mini-css-extract-plugin` берёт много css-файлов и объединяет их в один, то есть собирает бандл. Используется в prod-режиме.
`postcss-loader` нужен, чтобы подключить PostCSS.
`autoprefixer` научит PostCSS добавлять вендорные префиксы.
`cssnano` делает минификацию/оптимизацию CSS-кода.
`style-loader` автоматически обрабатывает импортированные CSS-файлы, объединяет их, а затем встраивает стили в тег `<style>` HTML-документа. Используется в dev-режиме, чтобы автоматически внедрять стили без полной перезагрузки страницы.
`sass-loader` является надстройкой для Webpack и использует библиотеку sass для компиляции Sass-кода в CSS.
`sass` является JavaScript-реализацией Sass, препроцессора для таблиц стилей.

правило для работы со шрифтами 
```javascript
{
    test: /\.(png|jpg|gif|webp)$/,
    type: 'asset/resource',
        generator: {
            filename: 'static/images/[hash][ext][query]',
        },
},
{
    test: /\.(woff(2)?|eot|ttf|otf)$/,
    type: 'asset/resource',
        generator: {
            filename: 'static/fonts/[hash][ext][query]',
        },
},
```

- `npm install -D url-loader [@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack) ` - для работы с svg
правило для работы с svg
```javascript
{
  test: /\.svg$/i,
  issuer: /\.[jt]sx?$/,
  use: ['@svgr/webpack', 'url-loader'],
}, 
```

## Разделение prod-сборки и dev

- `npm install -D merge` - объединения конфигураций prod-сборки и dev

В начале скрипта `build` используется пакет `cross-env` для кроссплатформенного создания переменной окружения `NODE_ENV`. Она нужна для определения переменной `production` файла в `webpack.common.js`. Установлен пакет `cross-env` командой `npm i -D cross-env`

`npm install -D @pmmmwh/react-refresh-webpack-plugin react-refresh` - чтобы React не сбрасывал свои состояния при сохранении файлов

## Команды сборки и запуска

- `npm run build` - запуск сборки
- `npm start` - инициирует процесс сборки приложения, а также запустит локальный сервер, который будет доступен в браузере
