---
title: Laravel docker prosto
tags:
    - laravel
    - docker
categories:
    - php
---

_Ten wpis dotyczył będzie laravela, ale użyte w nim stwierdzenia mają swoje odniesienie do całego środowiska php. Laravel posłuży tutaj jako przykład zastosowania a sposób w jaki proponuję ustawić środowisko developerskie jest jedną z propozycji._

Jeśli chodzi o uruchamianie projektów php w celu lokalnej developerki dawniej korzystaliśmy z programów typu xampp, uczyliśmy się obsługi serwera apache na linuxie, zamartwialiśmy się o zawartość pliku etc/hosts gdzieś w systemie. Na szczęście te czasy odchodzą w niepamięć.

## Docker

Mamy Dockera. Z czym to się je, co to jest? Najprościej mówiąc jest to zamknięte, wirtualne środowisko, jak się potocznie mówi: kontener. Nie ważne jak skonfigurowany jest Twój system, jaką masz wersję PHP, Node, Ruby - kontener ma swoją niezależną rzeczywistość. [Dokumentacja dockera](https://docs.docker.com/get-started/) jest bogata w szczegóły, kontenery łączy się w grupy, trzeba zadbać o "data persistence", bo przy każdym zatrzymaniu kontenera, wraca on do swojej poprzedniej postaci. Prawda, że na razie brzmi to skomplikowanie?

## Docker Compose

Na szczęście twórcy dockera wymyślili narzędzie [docker-compose](https://docs.docker.com/compose/install/#install-compose), jest ono dołączone do dockera i cała jego zaleta polega na tym, że konfigurację wielu kontenerów trzyma się w jednym pliku. Wystarczy `docker-compose up` i jeśli posiadamy dobrze skonfigurowany plik **docker-compose.yml** - system wystartuje i pozostaje nam już tylko "wstukanie" adresu w przeglądarkę, lub wykonanie komendy za pomocą `docker-composer exec [nazwa_kontenera] [moja_komenda]`.

## Docker Compose Laravel

Laravel wraz z pojawianiem się nowych wersji dostosowywał się do nowszych wersji PHP i wraz z pojawieniem się PHP 7 użytkownik nie używający wirtualnych środowisk był zmuszony podnosić wersję php w swoim systemie. A co jeśli miał inne projekty zależne np. od paczek działających tylko w starym php? Po to właśnie są kontenery.

Osoba mało obeznana z tematyką dockera, a tym bardziej docker-compose w przypadku istniejących już projektów laravela ma możliwość skorzystania z gotowego rozwiązania: [https://github.com/jguyomard/docker-laravel](https://github.com/jguyomard/docker-laravel).

### Jak dodać do projektu?

Nie ważne czy dopiero wystartowaliśmy czy projekt już istnieje. Zwyczajnie kopiujemy plik docker-compose.yml do głównego katalogu instalacji laravela, a następnie odpalamy w terminalu komendę: `docker-compose up`.

Docker ściąga potrzebne kontenery, które są opisane w powyższym pliku i nie pozostaje nam nic innego,jak wejść w przeglądarce na adres `0.0.0.0:8080`. Dlaczego właśnie taki? Warto poświęcić chwilę czasu na zrozumienie zawartości pliku docker-compose.yml . Oto on w całości:

```dockerfile
version: '2'
services:

  php:
    image: jguyomard/laravel-php:7.2
    volumes:
      - ./:/var/www/
      - $HOME/.composer/:$HOME/.composer/
    environment:
      - "DB_HOST=mysql"
      - "DB_DATABASE=homestead"
      - "DB_USERNAME=homestead"
      - "DB_PASSWORD=homestead"
      - "REDIS_HOST=redis"
      - "REDIS_PORT=6379"

  nginx:
    image: jguyomard/laravel-nginx:1.13
    volumes_from:
      - php
    ports:
      - 8080:80

  mysql:
    image: mysql:5.7
    volumes:
      - mysqldata:/var/lib/mysql
    environment:
      - "MYSQL_ROOT_PASSWORD=secret"
      - "MYSQL_DATABASE=homestead"
      - "MYSQL_USER=homestead"
      - "MYSQL_PASSWORD=homestead"
#    ports:
#        - "3306:3306"

#  pgsql:
#    image: postgres:9.6-alpine
#    volumes:
#      - pgsqldata:/var/lib/postgresql/data
#    environment:
#      - "POSTGRES_DB=homestead"
#      - "POSTGRES_USER=homestead"
#      - "POSTGRES_PASSWORD=homestead"
#    ports:
#        - "5432:5432"

  redis:
    image: redis:4.0-alpine
    command: redis-server --appendonly yes
#    ports:
#        - "6379:6379"

#  elastic:
#    image: elasticsearch:5.5-alpine
#    ports:
#        - "9200:9200"

volumes:
  mysqldata:
  pgsqldata:
```

Plik przy odrobinie wiedzy z zakresu dockera sam się tłumaczy. Ale po kolei: 

- `#` oznacza naturalnie komentarz, autor zostawia nam opcjonalnie parę możliwości, a to skorzystanie z redisa lub z wyszukiwania elastic search
- pliki yml czyta się kaskadowo, więc już na początku widać, jak nazywają się nasze kontenery: php, nginx, mysql . Będzie to miało znaczenie przy uruchamianiu komendy. Np. wiemy, że artisan jest w kontenerze php, więc dlatego wpisujemy `docker-compose exec php php artisan ...`. Pierwsze php to nazwa kontenera, drugie oznacza, że korzystamy z binarki php, która jest dostępna w kontenerze. Jest to PHP w wersji 7.2, a więc najnowszej i od razu dzięki temu możemy bez zbędnych ceregieli uruchomić nasz projekt z użyciem najnowszych technologii,
- image, to nazwa obrazu z serwisu docker hub. Można tworzyć własne i autor specjalnie przygotował php-laravel oraz nginx, które działają od razu. Można się pokusić np o zmianę cyferek przy obrazie mysql, np na 5.3 i zobaczyć, co się stanie z naszym projektem, czy przy takiej wersji nadal będziemy się cieszyć poprawnym działaniem
- volumes - to właśnie kawałek odpowiedzialny za zachowanie danych, które mogą zniknąć przy zatrzymaniu kontenerów, po lewej stronie dwukropka jest część odpowiedzialna za położenie wewnątrz kontenera, a po prawej - bezpieczne położenie w naszym systemie. Na samym dole są wymienione "volumes", które są dostępne w kontenerach,
- volumes\_from : w tym przypadku widać, że kontener nginx używa volumes z kontenera php, są ze sobą połączone,
- environment - zmienne użyte wewnątrz kontenera, co ważne, mają nadrzędne znaczenie w stosunku do konfiguracji zawartej np w .env laravela. Warto, żeby np. nazwy baz danych były specyficzne dla projektu, gdyż jeśli będą zawsze nazywały się `homestead` - istnieje ryzyko nadpisania przy zapisie w "volumie" na naszym dysku,
- ports - tutaj podobnie jak w volumes, po lewej jest część opisująca nasze środowisko (0.0.0.0:8080 - pamiętamy), a po prawej wewnątrz kontenera. Jakie to ma znaczenie? Kontenery łączą się miedzy sobą właśnie portami, które opisujemy w skryptach, ale co, gdy np chcemy podejrzeć zawartość bazy mysql bez wchodzenia do środka kontenera (tak tak, możemy zrobić `docker-compose exec php ls` i zobaczyć, co siedzi w środku). Korzystamy z portu po lewej stronie "wystawionego" do połączeń spoza kontenera, a więc w naszym komputerze.

I to byłoby na tyle. Jeszcze jedno ostrzeżenie, że w przypadku tej konfiguracji docker-compose upload plików jest ograniczony do 2M, ale dla chcącego nic trudnego, wystarczy zrobić własne custom.ini ze zmiennymi PHP odpowiedzialnymi za wielkość uploadu i POST'u i dodać jedną linijkę w docker-compose.yml, w konterze php, żeby kontener zaczął korzystać z naszej konfiguracji. "Just google it..."
