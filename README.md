# sprint_11_github.io
</h2>ver 0.0.4</h2>
Исправлены замечания.
<h3>ИНСТРУКЦИЯ</h3>
Для проверки работы сайта необходимо скопировать на компьютер
пользователя архив ветки "develop".
Распаковать файлы в папку (TMP).
У пользователя должно быть установлено ПО Webpack 4.43 и
Git-bash.
Запустить консоль git-bash.
В консоле последовательно набрать команды:
npm -i babel --save-dev,
npm -i core-js --save-dev,
npm -i babel-polyfill --save-dev,
npm -i group-css-media-queries-loader --save-dev,
для установки необходимых для сборки пакетов.
После окончания установки пакетов выполнить команду npm run build.
Запустится сборка и будет создана папка dist внутри которой размещены файлы сайта.
Для открытия сайта необходимо открыть inex.html.
Выполнение команды npm run dev вызывает запуск сборки с автоматическим
открытием сайта в окне браузера. В этой сборке доступен режим hotreload
Т.е. внесение изменений в файлы *.html и *.css в папке src вызовет автоматическое 
"пересобирание" пакета и внесенные изменения отразятся на сайте.
<p>ссылка на проект: https://vladimirkms.github.io/sprint_11_github.io/index.html</p>




