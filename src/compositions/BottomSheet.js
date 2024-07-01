import React, {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native-paper';
import {
  StyleSheet,
  View,
  Animated,
  PanResponder,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import {login} from '../services/signIn/login';
import {useDispatch, useSelector} from 'react-redux';
import {setItem} from '../common/utils/Storage/Storage';

const BottomSheet = () => {
  const bottomSheetY = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        bottomSheetY.setValue(gestureState.dy);
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(bottomSheetY, {
            toValue: 500,
            duration: 300,
            useNativeDriver: true,
          }).start();
        } else {
          Animated.spring(bottomSheetY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    }),
  ).current;

  const Navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signIn = useSelector(state => state.loginSlice.signIn);
  const dispatch = useDispatch();

  const loginAction = () => {
    // const loginData = {
    //   email: email,
    //   password: password,
    // };
    // dispatch(login(loginData));
    Navigation.navigate('BottomTabNavigator');
  };

  // useEffect(() => {
  //   if (signIn.isSuccess) {
  //     setItem('login-token', signIn.data.token + '');
  //     Navigation.navigate('BottomTabNavigator');
      
  //   }
  // }, [signIn]);

  return (
    <KeyboardAvoidingView style={styles.Maincontainor}>
      <View style={styles.Containor}>
        <View style={styles.LineContainor}>
          <View style={styles.Line} />
        </View>
        <View style={styles.DetailsContainor}>
          <View style={styles.MiddleContainor}>
            <View style={{flex: 1}}>
              <View style={styles.TxtInputContainor}>
                <Animatable.View animation="slideInRight">
                  <TextInput
                    style={styles.TxtInEmail}
                    mode="outlined"
                    label="Email :"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    theme={{
                      colors: {
                        primary: '#E2E2E2',
                        background: '#E2E2E2',
                      },
                    }}
                  />
                </Animatable.View>
              </View>
              <View style={styles.TxtInputContainor}>
                <Animatable.View animation="slideInLeft">
                  <TextInput
                    style={styles.TxtInPassword}
                    mode="outlined"
                    label="Password :"
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
                    theme={{
                      colors: {
                        primary: '#E2E2E2',
                        background: '#E2E2E2',
                      },
                    }}
                  />
                </Animatable.View>
              </View>
              <View style={styles.ForgotPassword}>
                <TouchableOpacity>
                  <View style={{flexDirection: 'row'}}>
                    <View style={{flex: 2}}></View>
                    <View style={{flex: 1}}>
                      <Text>ForgotPassword?</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.ButtonContainor}>
                <Animatable.View animation="slideInRight">
                  <TouchableOpacity
                    animation="bounceOut"
                    style={styles.Btn}
                    onPress={loginAction}>
                    <Text style={styles.BtnTxt}>Log In</Text>
                  </TouchableOpacity>
                </Animatable.View>
              </View>
            </View>
          </View>

          <View style={styles.bottomContainor}>
            <View style={styles.DevideLineContainor}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.DevideLine1} />
                <Text style={styles.DevideLineTxt}>Or Sign In</Text>
                <View style={styles.DevideLine2} />
              </View>
            </View>

            <View style={styles.BottomContainor}>
              <View style={styles.SignUP}>
                <Text style={{color: '#8A8A8A'}}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => Navigation.navigate('SignUp')}>
                  <Text style={styles.SignUPTxt}> Sign Up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  TxtInEmail: {
    width: '80%',
    marginLeft: '10%',
    backgroundColor: '#fff',
  },
  TxtInPassword: {
    width: '80%',
    marginLeft: '10%',
    backgroundColor: '#fff',
  },

  errorTxt: {
    marginLeft: '10%',
    color: 'red',
  },

  Line: {
    width: '30%',
    height: 4,
    backgroundColor: '#BCBCBC',
  },

  Btn: {
    backgroundColor: '#DD8A00',
    height: '90%',
    width: '80%',
    marginLeft: '10%',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  BtnTxt: {
    fontSize: 24,
    color: '#fff',
  },

  Line2: {
    flex: 1,
    width: 50,
    height: 1,
    backgroundColor: 'grey',
    marginTop: '10%',
  },
  Line3: {
    flex: 1,
    width: 10,
    height: 1,
    backgroundColor: 'grey',
    marginTop: '10%',
  },

  SignUPTxt: {
    fontWeight: 'bold',
    color: '#68B55C',
    fontSize: 16,
  },

  Maincontainor: {
    height: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
  },

  Containor: {
    flex: 1,
  },

  LineContainor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  DetailsContainor: {
    flex: 20,
  },

  MiddleContainor: {
    flex: 10,
  },

  bottomContainor: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  DevideLineContainor: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  DevideLine1: {
    flex: 1,
    marginLeft: '5%',
    height: 1,
    backgroundColor: '#CFCECE',
  },

  DevideLine2: {
    flex: 1,
    marginRight: '5%',
    height: 1,
    backgroundColor: '#CFCECE',
  },

  DevideLineTxt: {
    flex: 1,
    textAlign: 'center',
    color: '#5E5E5E',
  },

  BottomContainor: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  SignUP: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  TxtInputContainor: {
    flex: 1,
    justifyContent: 'center',
  },
  ButtonContainor: {
    flex: 1,
    justifyContent: 'center',
  },
  ForgotPassword: {
    flex: 0.3,
    justifyContent: 'center',
  },
});

export default BottomSheet;
