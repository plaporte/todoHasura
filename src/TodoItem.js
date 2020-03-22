import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { UPDATE_TODO, DELETE_TODO } from "../data/mutations";
import { GET_TODOS } from "../data/queries";

const TodoItem = ({ item }) => {
  const { id, text, is_completed } = item;

  const [ updateTodo, { loading: updateLoading, error: updateError } ] = useMutation(UPDATE_TODO);
  const [ deleteTodo, { loading: deleteLoading, error: deleteError } ] = useMutation(DELETE_TODO);

  if (deleteError || updateError) return <Text>`Error! ${error.message}`</Text>;

  return (
    <View style={styles.container}>
      <Text
        style={[styles.icon, is_completed ? styles.completed : {}]}
        onPress={() => {
          if (!updateLoading) {
            updateTodo({
              variables: { id, isCompleted: !is_completed }
            });
          }
        }}
      >
        {is_completed ? "Done" : "Complete"}
      </Text>
      <Text style={[styles.item, is_completed ? styles.completed : {}]}>
        {text}
      </Text>
      <TouchableOpacity
        style={[styles.button]}
        onPress={() => { 
            deleteTodo({ 
                variables: { id },
                refetchQueries: [{ query: GET_TODOS }] 
            });
        }}
        disabled={deleteLoading}
      >
        <Text style={styles.delete}></Text>
      </TouchableOpacity>
    </View>
  );
};

TodoItem.propTypes = {
  item: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    fontSize: 30
  },
  item: {
    padding: 10,
    fontSize: 24
  },
  completed: {
    color: "lightgray"
  },
  button: {
    backgroundColor: "green",
    padding: 5,
    marginLeft: "auto"
  },
  delete: {
    color: 'red',
    fontSize: 14,
  }
});

export default TodoItem;