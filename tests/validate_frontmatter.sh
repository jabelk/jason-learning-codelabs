#!/usr/bin/env bash

# Set variables
CONTENT_DIR=site/content
PYTHON_SCRIPT=${0/.sh/.py}

# Locate Python binary
PYTHON_BIN=$( which python3 )
if [ ${?} -gt 0 ]
then
	PYTHON_BIN=$( which python )
	if [ ${?} -gt 0 ]
	then
		echo "Unable to find python"
		exit 1
	fi
fi

# Pass found index.md files to python script
find ${CONTENT_DIR} -name index.md | xargs ${PYTHON_BIN} ${PYTHON_SCRIPT}
