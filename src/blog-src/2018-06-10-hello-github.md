---
title: Github Pages na Sculpin
tags:
    - sculpin
    - github
categories:
    - php
---

Jako generatora dla tego bloga użyłem Sculpin. Dlaczego? Ponieważ lubię PHP, bo proste rzeczy mnie cieszą, bo chcę pisać. W zasadzie każdym narzędziem można pisać. Ba, nawet długopisem, ale dziś Sculpinem.

Po przejrzeniu dokumentacji każdy, kto miał do czynienia z composerem będzie w stanie wystartować bloga w minutę.

```bash
git clone https://github.com/sculpin/sculpin-blog-skeleton.git myblog
cd myblog
composer install
```

Ale tak naprawdę chcemy publikować na github pages i publikować beztrosko. Załóżmy zatem repozytorium o nazwie naszego użytkownika github. Jeśli jesteś github.com/raul to zakładaj raul.github.io . Jest to wariant, w którym zakładamy github page dla naszego użytkownika. Pozostałe warianty to publikacja strony dla projektu, pod innym adresem, oraz publikacja z katalogu docs. Tym razem chodzi nam o publikację bloga dla użytkownika.

Moja propozycja wygląda następująco: robimy dwie gałęzie, np. master i sources. W master trzymajmy to, co wygenerowane, a w sources nasze źródło, jak sama nazwa wskazuje. W tym celu do pliku publish.sh wklejamy następujący kod:

```bash
#!/bin/bash

if [ $# -ne 1 ]; then
    echo "usage: ./publish.sh \"commit message\""
    exit 1;
fi

vendor/bin/sculpin generate --env=prod
if [ $? -ne 0 ]; then echo "Could not generate the site"; exit 1; fi

git add -f output_prod && git commit -m "$1"
git subtree push --prefix output_prod origin master
```

Pokrótce: wpisujemy w terminalu `./publish.sh "mój mesydż"` i nasz katalog `output_prod` zostanie wysłany do gałęzi master, co poskutkuje opublikowaniem strony pod adresem `<NASZ_USER>.github.io`

Blog gotowy!

Co jeszcze chciałbym dodać? W Sculpinie jest parę rzeczy do poprawienia, skrypty js wczytywane przez composera (to dopiero można by rzec frontendowy beton), przemyślany deploy dla różnych serwisów, wreszcie jakiś katalog skórek do wyboru. Ale z drugiej strony im mniej funkcji, tym lepiej, a zestaw narzędzi php sprawia, że czuję się jak na biwaku z wielofunkcyjnym scyzorykiem. I co najważniejsze, mogę wreszcie coś napisać.
