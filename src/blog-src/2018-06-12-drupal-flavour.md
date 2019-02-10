---
title: drush sql
tags:
    - drupal
    - drush
categories:
    - php
---

Dzisiejszą inspirację stanowi [artykuł](http://www.tylerfrankenstein.com/code/use-drush-export-import-drupal-mysql-database-dump-file), w który często zaglądam przy szybkim deploymencie drupali z jednego środowiska w drugie. Warto zapisać z niego wyciąg, zanim kawałek internetu zniknie.

Będziemy pisać komendy, które szybko wymienią nam całe bazy w drupalu. Ominie nas korzystanie z narzędzia mysqldump, nie trzeba pisać tutaj danych logowania, a także uchroni nas przed koniecznością korzystania z czasochłonnych, webowych interfejsów.

Aby zrobić backup `drush sql-dump > ~/bazka.sql`

Wgrać backup `drush sql-cli < ~/bazka.sql`

Dropnąć tabele `drush sql-drop`

Gzipnąć za dużą bazę `gzip -c ~/bazka.sql > ~/bazka.sql.gz`

No i jaka komenda w drupalu występuje najczęściej ? Każdy to wie:

```
drush cc all //albo drush cr dla 8ki
```

That's all folks!

W post scriptumie dla użytkowników chętnych bardziej nadmienię, że jeśli mamy dostęp do roota projektu przez ssh, można po operacji backupu zrzucić bazkę ze zdalnego na swój komputer `scp user@hostip:bazka.sql.gz ~/bazka.sql`

