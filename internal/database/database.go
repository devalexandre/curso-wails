package database

import (
	"context"
	"fmt"

	"github.com/vingarcia/ksql"
	"github.com/vingarcia/ksql/adapters/ksqlite3"
)

type KsqlSqlite struct {
	ksql.DB
}

func NewConnection(path string) *KsqlSqlite {
	conn, err := ksqlite3.New(context.Background(), path, ksql.Config{
		MaxOpenConns: 1,
	})

	if err != nil {
		panic(err)
	}

	fmt.Println("Connected to database")
	return &KsqlSqlite{conn}
}
