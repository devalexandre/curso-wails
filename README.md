# README
```sql
CREATE TABLE tasks (
	id	INTEGER PRIMARY KEY,
	titulo	varchar(100) NOT NULL,
	descricao	TEXT NOT NULL,
	estimativa	INTEGER NOT NULL,
	data_criacao	date DEFAULT CURRENT_DATE,
	data_entrega	date
);

CREATE TABLE historico(
    id integer PRIMARY KEY AUTOINCREMENT,
    task_id varchar(45) references tasks(id),
    texto TEXT NOT NULL,
    data date DEFAULT CURRENT_DATE
    )
```