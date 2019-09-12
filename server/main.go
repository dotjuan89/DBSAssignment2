package main

import (
	"github.com/gin-gonic/gin"
)

func main() {
	// Declare Gin as router
	router := gin.Default()

	// Server static files with Gin
	router.Static("/", "../client/build")

	// Start server
	router.Run(":3000")
}
