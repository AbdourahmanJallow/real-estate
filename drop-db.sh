#!/bin/bash

set -e

PG_SUPERUSER="postgres"
DB_NAME="real_estate"

drop_database(){
    local db_name=$1

    echo "Checking if database '$db_name' exists..."
    db_exists=$(psql -U $PG_SUPERUSER -tAc "SELECT 1 FROM pg_database WHERE datname='$db_name'")
    if [[ "$db_exists" == "1" ]]; then
        echo "Dropping Database '$db_name'..."
        psql -U $PG_SUPERUSER -v ON_ERROR_STOP=1 <<-EOSQL
            DROP DATABASE "$db_name";
EOSQL
        echo "✅ Database '$db_name' dropped successfully."
    else
        echo "Database '$db_name' does not exist. Skipping drop."
    fi
}

drop_database "$DB_NAME"
echo "✅ DROP DONE."