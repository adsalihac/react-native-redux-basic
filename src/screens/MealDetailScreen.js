import React from 'react'

import { useLayoutEffect } from 'react';

// 10 - import useSelector & useDispatch from react-redux
import {useSelector , useDispatch} from 'react-redux'

import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import { MEALS } from '../data/dummy-data';


// 11 - import addFavorite , removeFavorite from favorite.js
import { addFavorite , removeFavorite } from '../store/redux/favorite'


function MealDetailScreen({ route, navigation }) {
  const mealId = route.params.mealId;

  // 12 - useSelector to get the state from the store
  const favoriteMealIds = useSelector((state) => 
    state.favoriteMeals.ids
  );

  // 13 - useDispatch to dispatch actions to the store
  const dispatch = useDispatch();


  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  // 14 mealfavorite is a boolean to check if the meal is favorite or not
  const mealfavorite = favoriteMealIds.some((meal) => meal === mealId);

  // 15 - click on the favorite button to add or remove the meal from the favorite list
  function changeFavoriteStatusHandler() {
    if (mealfavorite) {
      dispatch(removeFavorite({id : mealId}));
      console.log('removeFavorite');
    }
    else {
      dispatch(addFavorite({id : mealId}));
      console.log('addFavorite');
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            icon={mealfavorite ?  "star" : 'md-star-outline'}
            color={mealfavorite ? '#fca311' : 'white'}
            onPress={changeFavoriteStatusHandler}
          />
        );
      },
    });
  }, [navigation, changeFavoriteStatusHandler]);

  return (
    <ScrollView style={styles.rootContainer}>
      <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <MealDetails
        duration={selectedMeal.duration}
        complexity={selectedMeal.complexity}
        affordability={selectedMeal.affordability}
        textStyle={styles.detailText}
      />
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 350,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    margin: 8,
    textAlign: 'center',
    color: 'white',
  },
  detailText: {
    color: 'white',
  },
  listOuterContainer: {
    alignItems: 'center',
  },
  listContainer: {
    width: '80%',
  },
});
