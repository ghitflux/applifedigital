#!/bin/bash
set -e

echo "Installing dependencies..."
pip install -q -r requirements.txt

echo "Running seed script..."
python seed.py
