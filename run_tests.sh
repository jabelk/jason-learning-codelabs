#!/usr/bin/env bash

TEST_DIR="tests"

for FILE in $( find ${TEST_DIR} -type f -name "*.sh" )
do
    ${FILE}
done
