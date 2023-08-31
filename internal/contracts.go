package internal

import "time"

type Historico struct {
	ID     int64     `json:"id" ksql:"id"`
	TaskID int64     `json:"task_id" ksql:"task_id"`
	Texto  string    `json:"texto" ksql:"texto"`
	Data   time.Time `json:"data" ksql:"data,timeNowUTC"`
}

type Tasks struct {
	ID          int64       `json:"id" ksql:"id"`
	Titulo      string      `json:"titulo" ksql:"titulo"`
	Descricao   string      `json:"descricao" ksql:"descricao"`
	Estimativa  int         `json:"estimativa" ksql:"estimativa"`
	DataCriacao time.Time   `json:"data_criacao" ksql:"data_criacao,timeNowUTC"`
	DataEntrega *time.Time  `json:"data_entrega" ksql:"data_entrega"`
	Historico   []Historico `json:"historico" `
}

type PartialTask struct {
	ID          int64     `json:"id" ksql:"id"`
	DataEntrega time.Time `json:"data_entrega" ksql:"data_entrega"`
}
