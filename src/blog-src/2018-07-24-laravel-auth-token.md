---
title: Autoryzacja komponentu Vue.js w aplikacji monolitycznej Laravel
tags:
    - laravel
    - vuejs
categories:
    - php
---

Tytuł brzmi jakby z kosmosu, ale sprawy mają się w gruncie rzeczy prosto. Nie będziemy tutaj tworzyć aplikacji typu SPA(single page app), a jedynie doświadczymy lekkiego flirtu z frontendowymi komponentami Vue.js.

## Middleware auth:api

Być może zastanawiałeś się, jak działa middleware, którego wyraźne istnienie jest zaznaczone w pliku z routami api(routes/api.php)?

Jest to prosta autentykacja Twojego api za pomocą tokena, jest włączona domyślnie w pliku config/auth.php. Ale jak to działa? Otóż nie działa. Najpierw trzeba wykonać kilka kroków.

## Potrzebne do skorzystania z autentykacji tokenem

1. Dodanie kolumny `api_token` do tabeli `users` - powiedzmy `VARCHAR(60)`.
2. Uzupełnienie modelu o dane pola `api_token`, robimy go fillable, ale też hidden.
3. Uzupełnienie kontrolera rejestracji użytkownika o funkcję generującą token np.: `str_random(60)`
3. Wyświetlenie naszego tokenu wewnątrz layoutu. Np. poprzez dodanie skryptu na dole strony:

```javascript
<script>
    window.Laravel = {!! json_encode([
        'apiToken' => auth()->user()->api_token ?? null,
    ]) !!};
</script>
```

I jak do tej pory gotowe. Jeśli Twoja aplikacja skorzystała z generowanego systemu autentykacji (`php artisan make:auth`), to po zalogowaniu się, w ciele strony zobaczysz token. Skopiuj jego zawartość i zobacz, że autoryzacja token naprawdę działa. Skorzystaj właśnie z przykładowego routa `/api/user?api_token=XXXXXX`. Przy braku tokena nastąpi przekierowanie do home, a jeśli token jest poprawny - zobaczysz dane użytkownika. Dobra, ale co dalej? Przecież nie będziesz doklejał ciągu znaków do każdego urla w aplikacji? Gdzie w tym wszystkim korzyści?

## Komponenty Vue.js

Dawno temu twórcy Laravela wybrali Vue.js jako podstawową bibliotekę, dzięki której interfejsy aplikacji tworzonych za pomocą Laravela o nowoczesne komponenty (jakkolwiek by to nie brzmiało). W repozytorium frameworka (5.6 - przypadek redakcji), w katalogu `resources/assets/js` znajdziesz przygotowany przykład użycia tej właśnie biblioteki z przykładowym komponentem. Dodatkowo jest jeszcze kilka innych bibliotek,w tym axios, odpowiedzialny właśnie za połączenie z API.
Vue.js jest w miarę łatwo przyswajalnym frameworkiem i po paru drobnych potyczkach z dokumentacją, będziesz w stanie stworzyć właśnie taki własny komponent, który wkleisz do aplikacji. Ale co przyjdzie z samego komponentu? Może jakieś drobne modyfikacje DOM, ciekawsze inputy. Jednak prawdziwą solą ziemi internetu jest stworzenie komponentu, który będzie zarządzał danymi pobieranymi z API, a te warto zabezpieczyć. Bo co innego połączyć się z API wewnątrz aplikacji, w której jesteś
zalogowany, a co innego wpisać adres, z którego pobierasz dane i zobaczyć je poza kontekstem aplikacji. To dziura w bezpieczeństwie. Dodajmy zatem autentykację laravelową wewnątrz naszego komponentu.

## Token wewnątrz aplikacji Vue-Laravel

W katalogu `resources/assets/js` znajdź plik bootstrap.js i tam w miejscu, gdzie konfigurujemy axios, dodajemy nasz dodatkowy header, który będzie odpowiedzialny za autentykację zapytań.

```js
window.axios.defaults.headers.common['Authorization'] = 'Bearer ' + Laravel.apiToken;
```

Dzięki temu, że wcześniej dodałeś klucz token wewnątrz layoutu i przypiąłeś go do globalnego obiektu `Laravel` - mamy do niego dostęp i używamy go w autentykacji. Teraz już nie musisz dodawać parametru get przy każdym zapytaniu. Żeby komponent zbudował się na nowo wpisz w terminalu komendę: `npm run dev|watch|prod`.

Na zakończenie jeszcze przykładowy komponent vue.js, który łączy się z naszym api.

```html
<template>
    <div class="container">
        <div class="row justify-content-center">
            Grupy
            ...tutaj instrukcje typu v-for...
        </div>
    </div>
</template>

<script>
    export default {
        created() {
            console.log('created')
            this.getGroups()
        },
    methods: {
        getGroups() {
            axios.get('http://localhost:8000/api/groups')
                .then(response => {console.log('wynik',response)})
                .catch(error => {console.log(('err', error))})
        }
    }
}
</script>
```


I to w zasadzie wszystko. Komponent łączy się z api, połączenie jest zabezpieczone. Dodatkowym gratisem od twórców Laravela jest `login throttle`. Czyli ograniczenie ilości requestów na minutę. Jeśli zajrzysz w nagłówki odpowiedzi z serwera - przy zapytaniach do api zobaczysz dwie dodatkowe wartośći: 

```
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 58
```

Przy zbyt dużej ilości zapytań do api, serwer zwróci błąd 429 i na następne zapytnie trzeba będzie czekać kolejną minutę.

Bezpieczeństwo to kamień węgielny Twojej aplikacji.
