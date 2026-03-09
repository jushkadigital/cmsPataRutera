#!/bin/bash
set -e

echo "==> Iniciando restore"
echo "DB: $POSTGRES_DB"
echo "User: $POSTGRES_USER"

pg_restore \
  --verbose \
  --username="$POSTGRES_USER" \
  --dbname="$POSTGRES_DB" \
  --clean \
  --if-exists \
  /dump/backup_20260123_041220.dump

psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<EOF
CREATE TABLE IF NOT EXISTS __restore_healthcheck (
  id BOOLEAN PRIMARY KEY DEFAULT TRUE
);
INSERT INTO __restore_healthcheck (id)
VALUES (TRUE)
ON CONFLICT DO NOTHING;
EOF

echo "==> Restore finalizado"
