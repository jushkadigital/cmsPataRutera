#!/bin/bash
set -euo pipefail

echo "==> Iniciando restore"
echo "DB: $POSTGRES_DB"
echo "User: $POSTGRES_USER"

export PGPASSWORD="$POSTGRES_PASSWORD"

pg_restore \
  --verbose \
  --username="$POSTGRES_USER" \
  --dbname="$POSTGRES_DB" \
  --clean \
  --if-exists \
  --no-owner \
  --no-privileges \
  /dump/backup_20260105_153850.dump

psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" <<'EOF'
CREATE TABLE IF NOT EXISTS __restore_healthcheck (
  id BOOLEAN PRIMARY KEY DEFAULT TRUE
);
INSERT INTO __restore_healthcheck (id)
VALUES (TRUE)
ON CONFLICT DO NOTHING;
EOF

echo "==> Restore finalizado"
