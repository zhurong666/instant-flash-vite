#!/bin/bash

# Connect to the database
PSQL="psql --username=freecodecamp --dbname=salon -t -c"

# Function to display the main menu
display_menu() {
  echo "Welcome to the Salon! How can I help you today?"
  SERVICES=$($PSQL "SELECT service_id, name FROM services ORDER BY service_id")
  echo "$SERVICES" | while read SERVICE_ID BAR NAME; do
    echo "$SERVICE_ID) $NAME"
  done

  echo -e "\nWhat is your SERVICE_ID_SELECTED?"
  read SERVICE_ID_SELECTED
  case $SERVICE_ID_SELECTED in
    1) doIt 1;;
    2) doIt 2;;
    3) doIt 3;;
    *) display_menu "Please enter a valid option." ;;
  esac
}

doIt() {
  if [[ $1 ]]
  then
    SERVICE_ID_SELECTED = $1
  fi
  echo -e "\nWhat is your phone?"
  read CUSTOMER_PHONE
  CUSTOMER_NAME=$($PSQL "SELECT name FROM customers WHERE phone = '$CUSTOMER_PHONE'")
  if [[ -z $CUSTOMER_NAME ]]; then
    echo -e "\nI don't have. What is your name?"
    read CUSTOMER_NAME
    INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO customers(phone, name) VALUES('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")
  fi
  echo -e "\nWhat is your time?"
  read SERVICE_TIME
  CUSTOMER_ID=$($PSQL "SELECT customer_id FROM customers WHERE phone = '$CUSTOMER_PHONE'")
  INSERT_CUSTOMER_RESULT=$($PSQL "INSERT INTO appointments(customer_id,service_id,time) VALUES('$CUSTOMER_ID','$SERVICE_ID_SELECTED', '$SERVICE_TIME')")
  SERVICE_NAME=$($PSQL "SELECT name FROM services where service_id = $SERVICE_ID_SELECTED")
  echo -e "\nI have put you down for a $(echo $SERVICE_NAME | sed 's/ |/"/') at $SERVICE_TIME, $(echo $CUSTOMER_NAME | sed 's/ |/"/')."
}

display_menu
