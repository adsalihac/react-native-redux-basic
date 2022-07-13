import React from 'react'

import { useLayoutEffect } from 'react';

// 16 - import useSelector & useDispatch from react-redux
import {useSelector , useDispatch} from 'react-redux'

import { View, Text, Image,FlatList, StyleSheet, ScrollView } from 'react-native';

import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import { MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';


// 17 - import addFavorite , removeFavorite from favorite.js
import { addFavorite , removeFavorite } from '../store/redux/favorite'


function FavoritesScreen({ route, navigation }) {

  // 18 - useSelector to get the state from the store
  const favoriteMealIds = useSelector((state) => 
    state.favoriteMeals.ids
  );

  // 19 - useDispatch to dispatch actions to the store
  const dispatch = useDispatch();

  const favoriteMeals = MEALS.filter((item)=> 
    favoriteMealIds.includes(item.id)
  )
  console.log("🚀 ~ file: FavoritesScreen.js ~ line 35 ~ FavoritesScreen ~ favoriteMeals", favoriteMeals)


  function renderMealItem(itemData) {
    const item = itemData.item;

    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      affordability: item.affordability,
      complexity: item.complexity,
      duration: item.duration,
    };
    return <MealItem {...mealItemProps} />;
  }

  return (
    <View style={styles.container}>
    <FlatList
      data={favoriteMeals}
      ListEmptyComponent={
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Text style={{
            fontSize: 20,
            textAlign: 'center',
            color: '#FFF',
          }}>No Favorites Added</Text>
        </View>
      }
      keyExtractor={(item) => item.id}
      renderItem={renderMealItem}
    />
  </View>
  );
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
