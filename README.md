# iut-project
## gestion des migrations 
lancer migration : npx knex migrate:latest
revenir en arrière d'une migration : npx knex migrate:rollback
revenir en arrière de toutes les migrations : npx knex migrate:rollback --all
donner l'etat des migrations : npx knex migrate:status