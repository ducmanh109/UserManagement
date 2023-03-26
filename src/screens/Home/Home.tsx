import { Button, FlatList, SafeAreaView, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { GET_NEWS_ENDPOINT } from 'api/endpoint/news.endpoint';
import { observer } from 'mobx-react';

const Home = () => {
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(GET_NEWS_ENDPOINT);

      if (!response) {
        return;
      }

      setData(response.data);
    } catch (error) {
      console.log('error>>>>>', error);
    }
  }, []);

  const renderItem = useCallback(() => {
    return (
      <View>
        <Text>HIhi</Text>
      </View>
    );
  }, []);

  return (
    <SafeAreaView>
      <Button title="Call API" onPress={getData} />

      <FlatList data={data} renderItem={renderItem} />
    </SafeAreaView>
  );
};

export default observer(Home);
