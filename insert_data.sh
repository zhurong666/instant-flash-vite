#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
fi


echo "Inserting unique teams..."
cat games.csv | while IFS=, read year round winner opponent winner_goals opponent_goals
do
  if [[ $winner != "winner" ]]; then
    # Check if the winner team is already in the teams table
    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$winner'")
    if [[ -z $WINNER_ID ]]; then
      INSERT_WINNER_RESULT=$($PSQL "INSERT INTO teams(name) VALUES('$winner')")
      if [[ $INSERT_WINNER_RESULT == "INSERT 0 1" ]]; then
        echo "Inserted team: $winner"
      fi
    fi

    # Check if the opponent team is already in the teams table
    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$opponent'")
    if [[ -z $OPPONENT_ID ]]; then
      INSERT_OPPONENT_RESULT=$($PSQL "INSERT INTO teams(name) VALUES('$opponent')")
      if [[ $INSERT_OPPONENT_RESULT == "INSERT 0 1" ]]; then
        echo "Inserted team: $opponent"
      fi
    fi
  fi
done


cat games.csv | while IFS=, read  year round winner opponent winner_goals opponent_goals
do
  if [[ $year != "year" ]]; then
    # Get the team IDs
    WINNER_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$winner'")
    OPPONENT_ID=$($PSQL "SELECT team_id FROM teams WHERE name = '$opponent'")

    # Insert the game
    INSERT_GAME_RESULT=$($PSQL "INSERT INTO games(year, round, winner_id, opponent_id, winner_goals, opponent_goals) VALUES($year, '$round', $WINNER_ID, $OPPONENT_ID, $winner_goals, $opponent_goals)")
    if [[ $INSERT_GAME_RESULT == "INSERT 0 1" ]]; then
      echo "Inserted game: $year, $round, $winner vs $opponent"
    fi
  fi
done
