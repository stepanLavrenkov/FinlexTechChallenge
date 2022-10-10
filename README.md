# FinlexTechChallenge

# How to run

- Make sure you have `node` installed on you machine
- Open a terminal and navigate to the source code folder
- Create an `.env` file from `.env.example` (`cp .env.example .env` command)
- Add admin credentials to the `.env` file
- Run `npm i` command
- Run `npm run cypress:run` command

# Note

There is a bug on the locations page, which blocks the creation of new locations. The error comes from google api (`InvalidKeyMapError`), when you try to set location name (you can see that in console)
I skipped a few tests because of it.

You can find the feature files under `cypress/e2e` folder
I used the page-oriented structure, the page classes are located under `cypress/pages` folder
