#!/usr/bin/env bash
host="$1"
shift
port="$1"
shift

until nc -z "$host" "$port"; do
  echo "Esperando a $host:$port..."
  sleep 1
done

exec "$@"
