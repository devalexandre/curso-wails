package tasks

import (
	"context"
	"devtask/internal"
	"devtask/internal/database"
	"fmt"

	"github.com/vingarcia/ksql"
)

var TasksTable = ksql.NewTable("tasks")

type Repository struct {
	db database.KsqlSqlite
}

func NewRepository(db database.KsqlSqlite) *Repository {
	return &Repository{db: db}
}

func (r *Repository) CreateTask(task internal.Tasks) error {
	err := r.db.Insert(context.Background(), TasksTable, &task)
	if err != nil {
		return err
	}
	return nil
}

func (r *Repository) GetTasks() ([]internal.Tasks, error) {
	var tasks []internal.Tasks
	err := r.db.Query(context.Background(), &tasks, "FROM tasks")
	fmt.Printf("Users: %#v\n", tasks)
	if err != nil {
		fmt.Println("Error: ", err)
		return nil, err
	}

	return tasks, nil
}

func (r *Repository) GetByID(id int) (*internal.Tasks, error) {

	var task internal.Tasks
	err := r.db.QueryOne(context.Background(), &task, "FROM tasks WHERE id = ?", id)
	if err != nil {
		return nil, err
	}

	//get historico by task id
	var historico []internal.Historico
	err = r.db.Query(context.Background(), &historico, "FROM historico WHERE task_id = ?", id)
	if err != nil {
		return nil, err
	}
	task.Historico = historico

	return &task, nil
}

func (r *Repository) DeleteTask(id int64) error {

	err := r.db.Delete(context.Background(), TasksTable, id)
	if err != nil {
		return err
	}
	return nil
}

func (r *Repository) UpdateTask(task internal.PartialTask) error {

	err := r.db.Patch(context.Background(), TasksTable, task)
	if err != nil {
		return err
	}
	return nil
}
