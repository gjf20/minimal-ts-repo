package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = ""
	dbname   = "appliedsystems"
)

func openConnection() *sql.DB {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"dbname=%s sslmode=disable",
		host, port, user, dbname)

	db, err := sql.Open("postgres", psqlInfo)

	if err != nil {
		panic(err)
	}

	return db
}

func ReadThings() []string {
	db := openConnection()
	defer db.Close()

	err := db.Ping()
	if err != nil {
		log.Fatalln("Ping failed")
		panic(err)
	}

	var res string
	var vals []string

	rows, err := db.Query("Select name from foo")

	if err != nil {
		log.Fatalln("Ping failed")
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		rows.Scan(&res)
		vals = append(vals, res)
	}

	return vals
}
