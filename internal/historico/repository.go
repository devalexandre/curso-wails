package historico

import (
	"context"
	"devtask/internal"
	"devtask/internal/database"

	"github.com/vingarcia/ksql"
)

var HistoricoTable = ksql.NewTable("historico")

type Repository struct {
	db database.KsqlSqlite
}

func NewRepository(db database.KsqlSqlite) *Repository {
	return &Repository{db: db}
}

func (h *Repository) Create(historico internal.Historico) error {
	// TODO
	err := h.db.Insert(context.Background(), HistoricoTable, &historico)
	if err != nil {
		return err
	}
	return nil
}
