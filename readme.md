Руководство по запуску:
1)npm install
2)npm run db_create - создаст базу данных(postgresql) transactionsdb с заданными конфигурациями (конфигурация лежит в /src/db/config/config.json)
3)npm run db_run_migration - запускает скрипт миграции, который создает в базе таблицу Transactions
4)npm run build - билд приложения; 
5)Для запуска сервиса: npm run start_service;
Для запуска апи-сервиса: npm run start_api
6)Для отката миграции использовать npm run db_migration_undo

Использование апи-сервиса:
эндпоинт - getMaxChange (пример GET-запроса - http://localhost:3000/getMaxChange);
порт запуска приложения, ссылка на используемый api от etherscan и api-key для него лежат в /config/config.json. 