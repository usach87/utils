#### Доступные версии
Список доступных версий - http://nexus.action-media.ru/#browse/browse:npm-group:%40product-platform%2Futils

#### Установка
```
npm install --save @usachev/utils
```

#### Версионирование

Номер пакета должнен состоять из трёх обязательных номерных версий: `{major}.{minor}.{patch}.`

  - **Патч версия** — используется для внесения мелких изменений, исправлений ошибок или легкий рефакторинг кода.

  - **Минорная версия** — предназначена для добавления нового функционала, изменения интерфейса или внесения больших изменений, которые соблюдают обратную совместимость. Если модифицируется утилита (либо переносится/добавляется с отличающимся интерфейсом), то нужно добавить в название утилиты версию методом инкримента и повысить минорную версию библиотеки.

  - **Мажорная версия** — та версия, в которой можно полностью менять поведение, удалять старый код и т.д. Изменение в текущей версии может сильно различаться с той, что используется на данный момент проектом. Они могут быть совершенно несовместимы. Когда накапливается большое количество версий утилит, то их необходимо смержить и повысить мажорную версию. Переход на мажорную вернсию согласовывается разработчиками.

  ##### Пример утилит с повышением версии
    ```
      export function debounce(f: Function, ms: number): Function {
        let timer: number | null = null;

        return (...args: object[]) => {
          const onComplete = () => {
            f.apply(debounce, args);
            timer = null;
          };

          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(onComplete, ms) as unknown as number;
        };
      }

      export function debounceV2<T, K>(callback: (...args: T[]) => void, that: K, ms = 1000): Function {
        let timer: number | null = null;

        return function encDebounce<T>(...args: T[]) {
          const onComplete = () => {
            callback.apply(that, args);
            timer = null;
          };

          if (timer) {
            clearTimeout(timer);
          }

          timer = window.setTimeout(onComplete, ms);
        };
      }
    ```

#### Разработка

#### Тестирование
```
npm run test
# to clear cache use jest --clearCache
```

#### Публикация
