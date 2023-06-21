[![eng](https://img.shields.io/badge/lang-eng-blue.svg)](https://github.com/ukashu/goodteacher-api/blob/main/README.md)
<div align="center">
  <img src="./banner_api_round.svg" width="60%" height="auto"/>
  <p>:warning: To jest backendowa część kodu aplikacji. Kod klienta znajduje się w repozytorium <a href="https://github.com/ukashu/goodteacher">goodteacher</a>.</p>
</div>

>## Opis
Aplikacja mobilna goodteacher to aplikacja która zastępuje zeszyt ucznia. Mogą z niej korzystać nauczyciele i uczniowie, w pierwotnym zamyśle szkół muzycznych, ale znajdzie ona zastosowanie też w innych rodzajach szkół. Nauczyciel może stworzyć klasę, dodać do niej uczniów i wysyłać im zadania do wykonania. Uczniowie mogą dołączać do klas (lub odrzucać zaproszenia) i zarządzać swoimi zadaniami. Aplikacja korzysta z React Native i backendu Node.js/Express.js.

>## Stack technologiczny
<ul>
  <p>Serwer:</p>
    <ul>
      <li>Node.js</li>
      <li>Express.js</li>
    </ul>
  <p>Baza danych:</p>
    <ul>
      <li>PostgreSQL</li>
      <li>Redis</li>
      <li>Prisma</li>
    </ul>
  <p>Uwierzytelnianie:</p>
    <ul>
      <li>JSON Web Token</li>
    </ul>
  <p>Testy:</p>
    <ul>
      <li>Jest</li>
    </ul>
  <p>Inne:</p>
    <ul>
      <li>Zod</li>
      <li>i18next</li>
      <li>Nodemailer</li>
      <li>express-rate-limit</li>
    </ul>
</ul>

>## Wymagania

<ul>
  <li><a href="https://nodejs.org/">Node.js</a></li>
  <li><a href="https://www.npmjs.com/">npm</a></li>
  <li><a href="https://redis.io/">Redis</a></li>
  <li><a href="https://www.postgresql.org/">PostgreSQL</a></li>
</ul>

>## Instalacja

1. Pobierz kod projektu.
2. Przejdź do lokalnego folderu projektu.
3. Stwórz plik ```.env``` w głównym folderze projektu o strukturze:
```
PORT = <sport serwera>
JWT_SECRET = <klucz do tworzenia tokenów sesji>
NODE_ENV = <"development" lub "production">
EMAIL_USER = <email outlook używany do wysyłania maili aktywacyjnych>
EMAIL_PASS = <hasło do maila>
EMAIL_SECRET = <klucz do generowania tokenów aktywacji konta>
REDIS_URL = <url serwera Redis>
DATABASE_URL = <dla bazy danych postgres hostowanej lokalnie - postgres://[USERNAME]:[PASSWORD]@localhost:5432/[DATABASE_NAME]>
```
4. Uruchom skrypt ```npm install``` <- zainstaluje to moduły potrzebne aplikacji
5. Uruchom skrypt ```npx prisma migrate dev``` <- zainicjuje to bazę danych PostgreSQL
6. Uruchom skrypt ```npm run dev``` <- uruchomi serwer
