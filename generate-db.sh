#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e


PG_SUPERUSER="postgres"


DB_NAME="real_estate"
DB_USER="postgres"


create_database() {
    local db_name=$1
    local db_user=$2

    echo "Checking if database '$db_name' exists..."
    db_exists=$(psql -U $PG_SUPERUSER -tAc "SELECT 1 FROM pg_database WHERE datname='$db_name'")
    if [[ "$db_exists" == "1" ]]; then
        echo "Database '$db_name' already exists. Skipping creation."
    else
        echo "Creating database '$db_name'..."
        psql -U $PG_SUPERUSER -v ON_ERROR_STOP=1 <<-EOSQL
            CREATE DATABASE "$db_name" OWNER "$db_user";
EOSQL
        echo "✅ Database '$db_name' created successfully."
    fi
}

# install uuid-ossp extension PG DB
install_uuid_ossp_extension() {
    local db_name=$1

    echo "Installing uuid-ossp extension in database '$db_name'..."
    psql -U $PG_SUPERUSER -d "$db_name" -v ON_ERROR_STOP=1 <<-EOSQL
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOSQL
    echo "uuid-ossp extension installed successfully in '$db_name'."
}

create_database "$DB_NAME" "$DB_USER"

install_uuid_ossp_extension "$DB_NAME"

echo "✅ Database '$DB_NAME' with owner '$DB_USER' has been checked or created successfully."