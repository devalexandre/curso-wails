package main

import (
	"devtask/internal/database"
	"devtask/internal/historico"
	"devtask/internal/tasks"
	"embed"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/logger"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	db := database.NewConnection("devtask.db")
	tasksRepository := tasks.NewRepository(*db)
	historicoRepository := historico.NewRepository(*db)

	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:    "devtasks",
		Width:    1024,
		Height:   768,
		Logger:   nil,
		LogLevel: logger.ERROR,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			tasksRepository,
			historicoRepository,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
