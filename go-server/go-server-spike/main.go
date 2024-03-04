package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"example.com/db"
)

func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintln(w, "hello world")
}

func fooHandler(w http.ResponseWriter, r *http.Request) {
	things := db.ReadThings()
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(things)
}

func main() {

	http.HandleFunc("/", hello)
	http.HandleFunc("/foo", fooHandler)

	http.ListenAndServe(":8090", nil)
}
