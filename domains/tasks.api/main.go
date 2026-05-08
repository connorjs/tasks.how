package main

import (
	"log"
	"net/http"
)

func main() {
	router := newRouter()

	log.Print("tasks.api listening on :8080")
	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatal(err)
	}
}
