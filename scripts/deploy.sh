#!/usr/bin/env bash
set -Eeuo pipefail

required_vars=(
  HOSTPOINT_HOST
  HOSTPOINT_USERNAME
  HOSTPOINT_PASSWORD
  HOSTPOINT_TARGET_PATH
)

for var_name in "${required_vars[@]}"; do
  if [[ -z "${!var_name:-}" ]]; then
    echo "Missing required environment variable: ${var_name}" >&2
    exit 1
  fi
done

if [[ ! -d "dist" ]]; then
  echo "The dist/ folder does not exist. Run npm run build before deploying." >&2
  exit 1
fi

if ! command -v lftp >/dev/null 2>&1; then
  echo "lftp is required for deployment but was not found." >&2
  echo "Install it locally with your package manager, for example: sudo apt-get install lftp" >&2
  exit 1
fi

echo "Deploying dist/ to ${HOSTPOINT_HOST}:${HOSTPOINT_TARGET_PATH}"
echo "Remote files not present in dist/ will be removed."

lftp \
  -u "${HOSTPOINT_USERNAME},${HOSTPOINT_PASSWORD}" \
  "sftp://${HOSTPOINT_HOST}" <<EOF
set cmd:fail-exit yes
set net:max-retries 2
set net:timeout 20
set net:reconnect-interval-base 5
set sftp:auto-confirm yes
set xfer:clobber yes
mirror --reverse --delete --verbose --parallel=4 dist/ "${HOSTPOINT_TARGET_PATH}"
bye
EOF

echo "Deployment finished successfully."
