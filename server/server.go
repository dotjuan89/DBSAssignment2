package main

import (
	"log"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// http.ServeFile(w, r, "public/index.html")
	})
	log.Fatal(http.ListenAndServe(":3000", nil))
}
