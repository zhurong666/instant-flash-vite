#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=postgres -t --no-align -c"

# Function to handle user input
handle_input() {
  read INPUT
  if [[ ! $INPUT =~ ^[0-9]+$ ]]; then
    echo "That is not an integer, guess again:"
    handle_input
  fi
}

# Prompt for username
echo "Enter your username:"
read USERNAME

# Check if user exists
USER_INFO=$($PSQL "SELECT * FROM users WHERE username = '$USERNAME'")

if [[ -z $USER_INFO ]]; then
  # Insert new user
  INSERT_USER_RESULT=$($PSQL "INSERT INTO users(username) VALUES('$USERNAME')")
  echo "Welcome, $USERNAME! It looks like this is your first time here."
else
  # User exists, welcome back
  GAMES_PLAYED=$(echo $USER_INFO | cut -d'|' -f3)
  BEST_GAME=$(echo $USER_INFO | cut -d'|' -f4)
  echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

SECRET_NUMBER=$((RANDOM % 1000 + 1))
ATTEMPTS=0

echo "Guess the secret number between 1 and 1000:"
handle_input

while [[ $INPUT -ne $SECRET_NUMBER ]]; do
  ATTEMPTS=$((ATTEMPTS + 1))
  if [[ $INPUT -lt $SECRET_NUMBER ]]; then
    echo "It's higher than that, guess again:"
  else
    echo "It's lower than that, guess again:"
  fi
  handle_input
done


ATTEMPTS=$((ATTEMPTS + 1))
echo "You guessed it in $ATTEMPTS tries. The secret number was $SECRET_NUMBER. Nice job!"


UPDATE_USER_RESULT=$($PSQL "UPDATE users SET games_played = games_played + 1, best_game = CASE WHEN best_game IS NULL THEN $ATTEMPTS WHEN best_game > $ATTEMPTS THEN $ATTEMPTS ELSE best_game END WHERE username = '$USERNAME'")
