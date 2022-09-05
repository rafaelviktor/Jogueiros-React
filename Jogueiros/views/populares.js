import * as React from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Image, Pressable } from 'react-native';

import logo from '../assets/jogueiros-logo.png'

function Populares() {
    return (
      <View style={styles.root}>
        <View style={styles.container}>
          <Image style={styles.logoImage} source={logo}></Image>
          <TextInput placeholder='Algum local de preferência?' style={styles.inputpesquisa} />
        </View>
        <ScrollView overScrollMode='never'>
          <View style={styles.containerCards}>
          <Pressable>
            <Image style={styles.cardImage} source={{uri : 'https://lh3.googleusercontent.com/fife/AAbDypDw2iRVXG1DXpZvRtg2PxE-jxPcBE_o3bX80SIFD6-Xn0d4IwOBTsqUddoSx9HUQXx0cxP5IPHW0GG1ZrtSnru6N-LAopA-C57RU673GF70DUcVJ9h6nrWUjxA_er3IU1AEgyqasKnWkdk72EeeFe7j4J3pR297WFGX7c_TBZ8TeY2HQOzZ9Ufr4SnMyWsaoCMWfaduANgYwamAEreYivR84Bj8MizSoKL9SXXPCH6G4VZ_ggNTU5TCAUjqYqnn7hxalHS4O2kfNal-Up9Tks3CCBuvFvE_TdYSxdaHaE9oV48ssh-7szXLw0EAGTBymcWkJD5v-pbbe4-4wCn8A24Eq4dL_7YMlRaLXYB6xsPWEZ-YRzCtQe6vfKaKsX0elwM5dGdPw8LHmirCcljsCbwch35F2zPJmawNTJDQ5hrZtfYmuGE9FLK0rjAQS-H4fyQhcW0cHSQZevirItDfVJe748nbByRuZ4qpODJMa0yd3Tfvd6WoAlkmt1R3hFDgbBZQ7rGvdjpjyov_uDvbuI31EHNdqYffHH5hHT1Eq61EbtyXUuX9tCpRAxzMjOmTc1kWE0huA-ogb9lViTyBoY-z318VIPylU_K9iZtjgKbZtT6izBEtxB56OVLjVt_fPxDRMvTFIDekeOUAlJi0Y_jYw923t_P4__eQWTYLDY7YqjX6py56_BVxzSwAjvTIPErE1uWpgl2gQlstw10rmzKR9UpX23w184OH0_l48tcGTwbCBAvkkNTIlE-6VRvN7V3LyhAZVlcOa-Bb2Ct3ykhpZ075ya6wDRyd2jJRfZdV1I3tL_v5XwtPurOp5n6yjk0uaJwTY1e5SdvwYapBgCYW4njU3Ik4MoLG2YvpN36GeR44bjc8oGdfcLQHV1mBof6eOQ9mB6XSrf6KBmDrlQu4sCJ7YhNYEmjcfpmMzRVdVwMuMlH2HzxcFy8LhN6od5tXTiTGN4Xi3cx92JmQhzK2HMoocGO_YBgGDQTWyYIGHElFMfsAQxO53EzN_I231Rz89ysgRM5ATaJOG640xf0sy59vIOi7CePURKCOOgBS9yZrcCkjxXYnWCiQUHdPG3u8jIpwL7uP8JS9Nvn1Fh15lc3MnKagqjkTGKJvMp2Q9QTPnhbcpeyJkBWTN-ShNBe3WHsVFxT4I012qt11LzRj4I0_mxmJ1I9KQQY0GgvnOWEyEe_QKo_XFvryzsfT0du6WEi7Qaty4QqmbxkMxygjgbejilHzzNgv0q6C30cdiV12ZaGf-4wShrEqh9C0Z89-PnA5dI6lAa2yURmf1P-6M6BhRRE4NjP6SSlZdIQ=w1879-h962'}}></Image>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Text style={styles.cardTitle}>Bom de Bola Society</Text>
                <Text style={styles.cardSubtitle}>10 Visualizações</Text>
              </View>
              <Text style={styles.cardPrice}>100 R$ /hora</Text>
            </View>
          </Pressable>

          <Pressable>
            <Image style={styles.cardImage} source={{uri : 'https://lh3.googleusercontent.com/fife/AAbDypDw2iRVXG1DXpZvRtg2PxE-jxPcBE_o3bX80SIFD6-Xn0d4IwOBTsqUddoSx9HUQXx0cxP5IPHW0GG1ZrtSnru6N-LAopA-C57RU673GF70DUcVJ9h6nrWUjxA_er3IU1AEgyqasKnWkdk72EeeFe7j4J3pR297WFGX7c_TBZ8TeY2HQOzZ9Ufr4SnMyWsaoCMWfaduANgYwamAEreYivR84Bj8MizSoKL9SXXPCH6G4VZ_ggNTU5TCAUjqYqnn7hxalHS4O2kfNal-Up9Tks3CCBuvFvE_TdYSxdaHaE9oV48ssh-7szXLw0EAGTBymcWkJD5v-pbbe4-4wCn8A24Eq4dL_7YMlRaLXYB6xsPWEZ-YRzCtQe6vfKaKsX0elwM5dGdPw8LHmirCcljsCbwch35F2zPJmawNTJDQ5hrZtfYmuGE9FLK0rjAQS-H4fyQhcW0cHSQZevirItDfVJe748nbByRuZ4qpODJMa0yd3Tfvd6WoAlkmt1R3hFDgbBZQ7rGvdjpjyov_uDvbuI31EHNdqYffHH5hHT1Eq61EbtyXUuX9tCpRAxzMjOmTc1kWE0huA-ogb9lViTyBoY-z318VIPylU_K9iZtjgKbZtT6izBEtxB56OVLjVt_fPxDRMvTFIDekeOUAlJi0Y_jYw923t_P4__eQWTYLDY7YqjX6py56_BVxzSwAjvTIPErE1uWpgl2gQlstw10rmzKR9UpX23w184OH0_l48tcGTwbCBAvkkNTIlE-6VRvN7V3LyhAZVlcOa-Bb2Ct3ykhpZ075ya6wDRyd2jJRfZdV1I3tL_v5XwtPurOp5n6yjk0uaJwTY1e5SdvwYapBgCYW4njU3Ik4MoLG2YvpN36GeR44bjc8oGdfcLQHV1mBof6eOQ9mB6XSrf6KBmDrlQu4sCJ7YhNYEmjcfpmMzRVdVwMuMlH2HzxcFy8LhN6od5tXTiTGN4Xi3cx92JmQhzK2HMoocGO_YBgGDQTWyYIGHElFMfsAQxO53EzN_I231Rz89ysgRM5ATaJOG640xf0sy59vIOi7CePURKCOOgBS9yZrcCkjxXYnWCiQUHdPG3u8jIpwL7uP8JS9Nvn1Fh15lc3MnKagqjkTGKJvMp2Q9QTPnhbcpeyJkBWTN-ShNBe3WHsVFxT4I012qt11LzRj4I0_mxmJ1I9KQQY0GgvnOWEyEe_QKo_XFvryzsfT0du6WEi7Qaty4QqmbxkMxygjgbejilHzzNgv0q6C30cdiV12ZaGf-4wShrEqh9C0Z89-PnA5dI6lAa2yURmf1P-6M6BhRRE4NjP6SSlZdIQ=w1879-h962'}}></Image>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Text style={styles.cardTitle}>Bom de Bola Society</Text>
                <Text style={styles.cardSubtitle}>10 Visualizações</Text>
              </View>
              <Text style={styles.cardPrice}>100 R$ /hora</Text>
            </View>
          </Pressable>

          <Pressable>
            <Image style={styles.cardImage} source={{uri : 'https://lh3.googleusercontent.com/fife/AAbDypDw2iRVXG1DXpZvRtg2PxE-jxPcBE_o3bX80SIFD6-Xn0d4IwOBTsqUddoSx9HUQXx0cxP5IPHW0GG1ZrtSnru6N-LAopA-C57RU673GF70DUcVJ9h6nrWUjxA_er3IU1AEgyqasKnWkdk72EeeFe7j4J3pR297WFGX7c_TBZ8TeY2HQOzZ9Ufr4SnMyWsaoCMWfaduANgYwamAEreYivR84Bj8MizSoKL9SXXPCH6G4VZ_ggNTU5TCAUjqYqnn7hxalHS4O2kfNal-Up9Tks3CCBuvFvE_TdYSxdaHaE9oV48ssh-7szXLw0EAGTBymcWkJD5v-pbbe4-4wCn8A24Eq4dL_7YMlRaLXYB6xsPWEZ-YRzCtQe6vfKaKsX0elwM5dGdPw8LHmirCcljsCbwch35F2zPJmawNTJDQ5hrZtfYmuGE9FLK0rjAQS-H4fyQhcW0cHSQZevirItDfVJe748nbByRuZ4qpODJMa0yd3Tfvd6WoAlkmt1R3hFDgbBZQ7rGvdjpjyov_uDvbuI31EHNdqYffHH5hHT1Eq61EbtyXUuX9tCpRAxzMjOmTc1kWE0huA-ogb9lViTyBoY-z318VIPylU_K9iZtjgKbZtT6izBEtxB56OVLjVt_fPxDRMvTFIDekeOUAlJi0Y_jYw923t_P4__eQWTYLDY7YqjX6py56_BVxzSwAjvTIPErE1uWpgl2gQlstw10rmzKR9UpX23w184OH0_l48tcGTwbCBAvkkNTIlE-6VRvN7V3LyhAZVlcOa-Bb2Ct3ykhpZ075ya6wDRyd2jJRfZdV1I3tL_v5XwtPurOp5n6yjk0uaJwTY1e5SdvwYapBgCYW4njU3Ik4MoLG2YvpN36GeR44bjc8oGdfcLQHV1mBof6eOQ9mB6XSrf6KBmDrlQu4sCJ7YhNYEmjcfpmMzRVdVwMuMlH2HzxcFy8LhN6od5tXTiTGN4Xi3cx92JmQhzK2HMoocGO_YBgGDQTWyYIGHElFMfsAQxO53EzN_I231Rz89ysgRM5ATaJOG640xf0sy59vIOi7CePURKCOOgBS9yZrcCkjxXYnWCiQUHdPG3u8jIpwL7uP8JS9Nvn1Fh15lc3MnKagqjkTGKJvMp2Q9QTPnhbcpeyJkBWTN-ShNBe3WHsVFxT4I012qt11LzRj4I0_mxmJ1I9KQQY0GgvnOWEyEe_QKo_XFvryzsfT0du6WEi7Qaty4QqmbxkMxygjgbejilHzzNgv0q6C30cdiV12ZaGf-4wShrEqh9C0Z89-PnA5dI6lAa2yURmf1P-6M6BhRRE4NjP6SSlZdIQ=w1879-h962'}}></Image>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Text style={styles.cardTitle}>Bom de Bola Society</Text>
                <Text style={styles.cardSubtitle}>10 Visualizações</Text>
              </View>
              <Text style={styles.cardPrice}>100 R$ /hora</Text>
            </View>
          </Pressable>

          <Pressable>
            <Image style={styles.cardImage} source={{uri : 'https://lh3.googleusercontent.com/fife/AAbDypDw2iRVXG1DXpZvRtg2PxE-jxPcBE_o3bX80SIFD6-Xn0d4IwOBTsqUddoSx9HUQXx0cxP5IPHW0GG1ZrtSnru6N-LAopA-C57RU673GF70DUcVJ9h6nrWUjxA_er3IU1AEgyqasKnWkdk72EeeFe7j4J3pR297WFGX7c_TBZ8TeY2HQOzZ9Ufr4SnMyWsaoCMWfaduANgYwamAEreYivR84Bj8MizSoKL9SXXPCH6G4VZ_ggNTU5TCAUjqYqnn7hxalHS4O2kfNal-Up9Tks3CCBuvFvE_TdYSxdaHaE9oV48ssh-7szXLw0EAGTBymcWkJD5v-pbbe4-4wCn8A24Eq4dL_7YMlRaLXYB6xsPWEZ-YRzCtQe6vfKaKsX0elwM5dGdPw8LHmirCcljsCbwch35F2zPJmawNTJDQ5hrZtfYmuGE9FLK0rjAQS-H4fyQhcW0cHSQZevirItDfVJe748nbByRuZ4qpODJMa0yd3Tfvd6WoAlkmt1R3hFDgbBZQ7rGvdjpjyov_uDvbuI31EHNdqYffHH5hHT1Eq61EbtyXUuX9tCpRAxzMjOmTc1kWE0huA-ogb9lViTyBoY-z318VIPylU_K9iZtjgKbZtT6izBEtxB56OVLjVt_fPxDRMvTFIDekeOUAlJi0Y_jYw923t_P4__eQWTYLDY7YqjX6py56_BVxzSwAjvTIPErE1uWpgl2gQlstw10rmzKR9UpX23w184OH0_l48tcGTwbCBAvkkNTIlE-6VRvN7V3LyhAZVlcOa-Bb2Ct3ykhpZ075ya6wDRyd2jJRfZdV1I3tL_v5XwtPurOp5n6yjk0uaJwTY1e5SdvwYapBgCYW4njU3Ik4MoLG2YvpN36GeR44bjc8oGdfcLQHV1mBof6eOQ9mB6XSrf6KBmDrlQu4sCJ7YhNYEmjcfpmMzRVdVwMuMlH2HzxcFy8LhN6od5tXTiTGN4Xi3cx92JmQhzK2HMoocGO_YBgGDQTWyYIGHElFMfsAQxO53EzN_I231Rz89ysgRM5ATaJOG640xf0sy59vIOi7CePURKCOOgBS9yZrcCkjxXYnWCiQUHdPG3u8jIpwL7uP8JS9Nvn1Fh15lc3MnKagqjkTGKJvMp2Q9QTPnhbcpeyJkBWTN-ShNBe3WHsVFxT4I012qt11LzRj4I0_mxmJ1I9KQQY0GgvnOWEyEe_QKo_XFvryzsfT0du6WEi7Qaty4QqmbxkMxygjgbejilHzzNgv0q6C30cdiV12ZaGf-4wShrEqh9C0Z89-PnA5dI6lAa2yURmf1P-6M6BhRRE4NjP6SSlZdIQ=w1879-h962'}}></Image>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
              <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <Text style={styles.cardTitle}>Bom de Bola Society</Text>
                <Text style={styles.cardSubtitle}>10 Visualizações</Text>
              </View>
              <Text style={styles.cardPrice}>100 R$ /hora</Text>
            </View>
          </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }

  const styles = StyleSheet.create({
    root: {
      backgroundColor: 'white',
      width: '100%',
      height: '100%',
    },
    container: {
      marginTop: 25,
      paddingLeft: 18,
      paddingRight: 18,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderColor: '#e8e8e8'
    },
    logoImage: {
      width: '100%',
      height: 66,
    },
    inputpesquisa: {
      backgroundColor: '#EAEAEA',
      padding: 10,
      borderRadius: 10,
      textAlign: 'center'
    },
    containerCards: {
      marginLeft: 18,
      marginRight: 18
    },
    cardImage: {
      marginTop: 10,
      marginBottom: 10,
      width: '100%',
      height: 250,
      borderRadius: 15
    },
    cardTitle: {
      marginLeft: 8,
      fontSize: 18,
      fontWeight: 'bold'
    },
    cardSubtitle: {
      marginLeft: 8,
      color: '#878787',
      fontSize: 13,
      fontWeight: 'bold'
    },
    cardPrice: {
      marginRight: 10,
      fontSize: 18,
      fontWeight: 'bold',
      color: '#1a9946'
    }
  });

export default Populares;