import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import CacheImage from './CacheImage';
// import {HOME_FEED_SCREEN} from './analytics/eventsConstants';
// import {trackEvent} from './analytics/utils';

function FeedItem({story, storyIndex}: any) {
  const navigation = useNavigation();

  const viewStory = (selectedStory: any) => {
    // trackEvent(
    //   HOME_FEED_SCREEN.eventCategory,
    //   HOME_FEED_SCREEN.events.NAVIGATE,
    // );

    navigation.navigate('StoryView', {story: selectedStory});
  };

  return (
    <View key={story.id} style={styles.container}>
      {
        //every 4 item in the home news feed shows an Ad

        storyIndex === 0 || storyIndex % 3 !== 0 ? (
          <TouchableOpacity onPress={() => viewStory(story)}>
            <View style={styles.content}>
              <CacheImage uri={story.webimage} style={styles.feedImg} />
              <View style={styles.padding}>
                <Text style={styles.title}>{story.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <BannerAd
            size={BannerAdSize.BANNER}
            unitId="ca-app-pub-5415127128968102/5758553162"
            onAdLoaded={() => {
              console.log('Advert loaded');
            }}
            onAdFailedToLoad={error => {
              //Test Admob account not verified. Ads will error
              // console.error('Advert failed to load: ', error);
            }}
          />
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
  },
  content: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  feedImg: {
    width: '100%',
    height: 150,
  },
  padding: {paddingLeft: 10, paddingRight: 10},
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 20,
    lineHeight: 30,
  },
  contentText: {lineHeight: 22, fontSize: 16, fontWeight: 'semibold'},
});

export default FeedItem;
