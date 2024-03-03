#!/bin/bash

# Check if 'name' argument is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <name>"
    exit 1
fi

name="$1"

# Define the template file and delimiter
template_file="template.txt"
delimiter="{NAME}"
lowercaseDelim="{LOWER_NAME}"

cd ~/workspace/typescript-react-app

# List of directories to check for the template file
directories=("src/server/datasources" "src/server/internalAPIs" "src/server/db/daos" "src/models" "src/server/graphql/resolvers")

# Function to create a new file from the template
create_file_from_template() {
    local template="$1"
    local new_file="$2"

    # Check if the template file exists
    if [ ! -e "$template" ]; then
        echo "Template file not found: $template"
        exit 1
    fi

    # Create a new file by replacing the placeholder with the provided name
    sed "s/$lowercaseDelim/$name/g; s/${delimiter}/${name^}/g" "$template" > "$new_file"

    echo "Created new file: $new_file"
}

make_singular() {
    local word="$1"

    # Check if the word is plural (ends with 's')
    if [[ "$word" == *s ]]; then
        # Make it singular by removing the 's'
        singular_word="${word%s}"
        echo "$singular_word"
    else
        echo "$word"
    fi
}

# Iterate through directories
for dir in "${directories[@]}"; do
    template_path="$dir/$template_file"
    last_part=$(basename "$dir")
    singular=$(make_singular "$last_part")

    new_file_path="$dir/$name.ts"

    # Check if the template file exists in the current directory
    if [ -e "$template_path" ]; then
        # Create a new file from the template
        create_file_from_template "$template_path" "$new_file_path"
    else
        echo "Template file not found in $dir"
    fi
done
