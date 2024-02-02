#!/usr/bin/env python3

import sys
import datetime
try:
    import frontmatter
except ImportError:
    print('CRITICAL: Python module \'python-frontmatter\' not found')
    print('\nInstall the needed module using the following command:\n')
    print('  pip3 install python-frontmatter\n')
    sys.exit(255)

# Define frontmatter fields to type for validation
fields = {
  'title': 'str',
  'description': 'str',
  'date': 'date',
  'categories': 'list',
  'tags': 'list',
  'duration': 'duration',
  'authors': 'str'
}

#################################################
# Validation function
def validate_frontmatter(content):

    # Parse frontmatter
    try:
        post = frontmatter.loads(content)
    except Exception as e:
        print('ERROR: Failed to load frontmatter: ' + str(e))
        return 1

    # Initialize empty problems list
    problems = list()

    # Ensure expected fields and basic validation
    missing_fields = list()
    empty_fields = list()
    for field in fields.keys():
        if field not in post.keys():
            missing_fields.append(field)
        elif len(str(post.metadata[field])) == 0 or post.metadata[field] is None:
            empty_fields.append(field)

    # Record missing and empty fields
    if len(missing_fields):
       problems.append('ERROR: Missing frontmatter fields: ' + ', '.join(missing_fields))
    if len(empty_fields):
       problems.append('ERROR: Empty frontmatter fields: ' + ', '.join(empty_fields))
    problem_fields = set(missing_fields)
    problem_fields.update(empty_fields)

    # Field specific tests - skipping already know problems
    for field in [ field for field in fields.keys() if field not in problem_fields ]:

        # Duration fields
        if fields[field] == 'duration':
            if post.metadata['duration'] < 300: # Duration less than 5 minutes
                problems.append('ERROR: Frontmatter \'duration\' is less than 5 minutes, this can happen using \'5\' instead of \'5:00\'')

        # List fields
        if fields[field] == 'list':
            if not isinstance(post.metadata[field], list):
                problems.append('ERROR: Frontmatter \'' + field + '\' is not a list of ' + field)
            elif len(post.metadata[field]) < 1:
                problems.append('ERROR: Frontmatter \'' + field + '\' has none listed')

        # String fields
        if fields[field] == 'str':
            if not isinstance(post.metadata[field], str):
                problems.append('ERROR: Frontmatter \'' + field + '\' is not a string')
            elif len(post.metadata[field]) <= 5:
                problems.append('ERROR: Frontmatter \'' + field + '\' is too short')

        # Date fields
        if fields[field] == 'date':
            if isinstance(post.metadata[field], datetime.date):
                diff = ( post.metadata[field] - datetime.date.today() ).days
                if diff >= 15:
                    problems.append('ERROR: Frontmatter \'' + field + '\' is ' + str(diff) + ' days in the future')
            else:
                problems.append('ERROR: Frontmatter \'' + field + '\' is not a date')

    # Print problems and return appropriately
    if len(problems):
        print('\n'.join(problems))
        return 1

    # Everything ok
    print('OK')
    return 0


#################################################
# Main program
if __name__ == '__main__':

    # Validate Input
    if len(sys.argv) == 1:
        print('Error: No input files provided on command line')
        sys.exit(254)

    # Gather command line passed file pathss
    files = sys.argv[1:]

    # Run through each file
    results = 0
    for filename in files:
        try:
            with open(filename) as FH:
                content = FH.read()
                FH.close()
        except FileNotFoundError:
            print(f'WARNING: \'{filename}\' File Not Found')
        except PermissionError:
            print(f'WARNING: \'{filename}\' File Permissions')
        except Exception as e:
            print(f'WARNING: \'{filename}\' General Expection: ' + str(e))
        else:
            # Display filename being validated
            print('VALIDATING: ' + filename)
            # Validate
            results += validate_frontmatter(content)
            print('')

    # Check if problems found
    if results > 0:
        print('Frontmatter Validation Errored')
        sys.exit(results)

    # Everything ok
    print('Frontmatter Validation Ok')
    sys.exit(0)
