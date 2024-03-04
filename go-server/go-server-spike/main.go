package main

import (
	"fmt"

	"example.com/db"
)

func main() {
	fmt.Println("hello world")

	things := db.ReadThings()
	fmt.Println(things)
}
