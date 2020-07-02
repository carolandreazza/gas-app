import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Switch, StatusBar, KeyboardAvoidingView } from 'react-native';
import { Stopwatch } from 'react-native-stopwatch-timer';
import { TextInputMask } from 'react-native-masked-text'

export default function App() {
  const [valMC, setValMC] = useState('');
  const [startStopB1, setstartStopB1] = useState(false);
  const [valorB1, setvalorB1] = useState(0);
  const [startStopAQ, setstartStopAQ] = useState(false);
  const [valorAQ, setvalorAQ] = useState(0);
  const [totalGasto, setTotalGasto] = useState(0);
  const [currentTimeB1, setcurrentTimeB1] = useState('');
  const [currentTimeAQ, setcurrentTimeAQ] = useState('');

  const handlestartStopB1 = () => {
    setvalorB1(anterior => anterior + 0.001);//M³ gastos
    setTotalGasto(valorB1 + valorAQ);
  }

  const handlestartStopAQ = () => {
    setvalorAQ(anterior => anterior + 0.001);
    setTotalGasto(valorB1 + valorAQ);
  }

  useEffect(() => {
    if (startStopB1) {
      handlestartStopB1();
    }
  }, [currentTimeB1]);
  
   useEffect(() => {
     if (startStopAQ) {
       handlestartStopAQ();
     }
  }, [currentTimeAQ]);

   const setOnOffB1 = () => {
     setstartStopB1(previousState => !previousState)
   };
  
   const setOnOffAQ = () => {
     setstartStopAQ(previousState => !previousState)
   };
  

  const getFormattedTimeB1 = (time) => {
    setcurrentTimeB1(time);
  }

  const getFormattedTimeAQ = (time) => {
    setcurrentTimeAQ(time);
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} 
    behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <View style={{flex:1,alignItems:'center', marginTop:0, backgroundColor:"#ADD8E6"}}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <View style={{flex:1,alignItems:'center', marginTop:90, backgroundColor:"#ADD8E6"}}>
          <Text style={{alignItems:'center', marginTop:-30, marginBottom:20, fontSize:24, backgroundColor:"#ADD8E6"}}>
            Controle de Gás
          </Text>
            <TextInputMask
              style={styles.inputP}
              placeholder="Valor M³"
              type={'money'}
              value={valMC}
              onChangeText={ct => setValMC(ct)}
            />

          <View style={styles.rowContainer}>
            <View style={styles.inRowContainer}>
              <Text style={styles.text}>Fogão B1</Text>
              <Switch 
              style={styles.startStop}
              onValueChange = {setOnOffB1}
              value = {startStopB1}/>
            </View>
            <View style={styles.inRowContainer}>
              <View style={styles.inInRowContainer}>
                <Text style={styles.texto}>Tempo Ligado</Text>
                <Stopwatch 
                  start={startStopB1}
                  options={options}
                  getTime={getFormattedTimeB1} />
              </View>
              <View style={styles.inInRowContainer}>
                <Text style={styles.texto}>Valor por M³</Text>
                <TextInputMask
                  style={styles.input}
                  type={'money'}
                  value={valorB1}
                />
              </View>
            </View>
          </View>

          <View style={styles.rowContainer}>
            <View style={styles.inRowContainer}>
              <Text style={styles.text}>Aquecedor</Text>
              <Switch 
              style={styles.startStop}
              onValueChange = {setOnOffAQ}
              value = {startStopAQ}/>
            </View>
            <View style={styles.inRowContainer}>
              <View style={styles.inInRowContainer}>
                <Text style={styles.texto}>Tempo Ligado</Text>              
                <Stopwatch
                  start={startStopAQ}
                  options={options}
                  getTime={getFormattedTimeAQ}  />
              </View>
              <View style={styles.inInRowContainer}>
                <Text style={styles.texto}>Valor por M³</Text>
                <TextInputMask
                  style={styles.input}
                  type={'money'}
                  value={valorAQ}
                />
              </View>
            </View>
          </View>

          <View style={styles.container}>
              <View style={styles.inInRowContainer}>
                <Text style={{fontSize: 24, marginTop:-30}}>TOTAL GASTO</Text>
                <TextInputMask
                  style={styles.inputP}
                  type={'money'}
                  value={totalGasto}
                />
              </View>
          </View>
        </View>
      </ View>
    </KeyboardAvoidingView>
  );
}

const options = {
  container: {
    backgroundColor: '#F0F0F5',
    padding: 5,
    borderRadius: 5,
    width: 120,
    alignItems:'center',
  },
  text: {
    fontSize: 18,
    marginLeft: 7,
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:20
  },
  inputP: {
    height: 60,
    backgroundColor: '#F0F0F5',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 24,
    fontSize: 20,
    borderWidth: 0,
    textAlign:'center'
   // marginTop:-10
  },
  input: {
    height: 35, 
    backgroundColor: '#F0F0F5',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 35,
    fontSize: 18,
    borderWidth: 0,
   // marginLeft:60
  },
  text: {
    flex: 1,
    fontSize:22,
    marginLeft:20
  },
  startStop: {
    marginRight:80
  },
  rowContainer: {  
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    paddingVertical: 5,
    paddingHorizontal: 32,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  inRowContainer: {  
    borderColor: '#999',
    paddingVertical: 5,
    flexDirection: 'row',
   justifyContent: 'space-between',
  },
  inInRowContainer: {
    marginLeft:20,
  },
  texto: {
    textAlign:'center'
  }
});
