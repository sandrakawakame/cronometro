import React, { StatusBar, useState } from 'react'; 
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';

let timer = null;
let ss = 0;
let mm = 0;
let hh = 0;

export default function App() {
  const [numero, setNumero] = useState(0);
  const [botao, setBotao] = useState('INICIAR');
  const [ultimo, setUltimo] = useState(null);


function vai(){
  // if timer estiver rodando
  if(timer !== null){
    //clearInterval - para o cronometro
    clearInterval(timer);
    //retorna o valor para null
    timer = null;
    //altera o texto para VAI novamente
    setBotao('INICIAR');
  }else{
    //senao, começa a girar o timer
    timer = setInterval(() => {

      ss++;

      if(ss == 60){
        ss = 0;
        mm++;
      }

      if(mm == 60){
        mm = 0;
        hh++;
      }

      let format = 
      (hh < 10 ? '0' + hh : hh) + ':'
    + (mm < 10 ? '0' + mm : mm) + ':'
    + (ss < 10 ? '0' + ss : ss)

      setNumero(format)

    }, 100);
    setBotao('PARAR');
  }
}

function limpar(){
  if(timer !== null){
    //pausar o timer
    clearInterval(timer);
    timer = null
  }

  setUltimo(numero);
  //zerar o numero
  setNumero(0)
  ss = 0;
  mm = 0;
  hh = 0;

  setBotao('INICIAR');
}


  return (
    <View style={styles.container}>
      
      <Image 
        source={require('./src/crono.png')}
      />

      <Text style={styles.timer}> { numero }</Text>

      <View style={styles.btnArea}>

        <TouchableOpacity style={styles.btn} onPress={vai}>
          <Text style={styles.btnTexto}> { botao } </Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.btn} onPress={limpar}>
          <Text style={styles.btnTexto}>LIMPAR</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.timerFinal}>
        <Text style={styles.textoCorrida}> 
          { ultimo ? 'Ultimo tempo: ' + ultimo : ''} 
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00aeef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    marginTop: -160,
    color: '#fff',
    fontSize: 45,
    fontWeight: 700,

  },
  btnArea: {
    flexDirection: 'row',
    marginTop: 130,
    height: 40,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 40,
    margin: 17,
    borderRadius: 9,

  },
  btnTexto: {
    fontSize: 20,
    fontWeight: 700,
    color: '#00aeef',
  },
  timerFinal: {
    marginTop: 40
  },
  textoCorrida:{
    fontSize: 25,
    color: '#fff',
    fontStyle: 'italic'
  }
});
