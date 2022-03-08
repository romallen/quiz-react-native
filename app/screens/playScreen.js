import Card from "../components/Cards"
import Header from "../components/headers"
import Scoreboard from "../components/scoreboard"
import {useState, useEffect} from "react";
import {StyleSheet, View, useWindowDimensions } from "react-native";
import { FlatGrid } from 'react-native-super-grid';
import data1 from "../data";
import { useSelector, useDispatch } from 'react-redux'


export default function PlayScreen(props) {
    const { height, width } = useWindowDimensions();
    const [cards, setCards] = useState([]);

    const [gState, setGState] = useState({windowWidth: width, windowHeight: height, data:[]})

   
    gState.data  = data1
    gState.rows = gState.data[0].questions.length
    gState.cols = data1.length


    let cardWidth;
 
  useEffect(()=>{
    gState.windowWidth= width
    gState.windowHeight= height

    const headerHeight = (gState.windowWidth  > 640 ? 60 : 32);
    cardWidth = (gState.windowWidth / gState.cols);
    //  let cardHeight = ((gState.windowHeight - headerHeight) / gState.rows);
    let cardHeight = ((gState.windowHeight - 169) / gState.rows);
    
    handleResize(cardHeight, cardWidth)
    
  },[width, height])
  
  let handleResize = (cardHeight, cardWidth) =>{
    
  let card = []

  gState.data.forEach((category, categoryIndex) => {
    let column = []
    category.questions.forEach((question, questionIndex) => {
        // console.log("cards",cardHeight, cardWidth)
      let keys = categoryIndex + '-' + questionIndex
      column.push(<Card keys={keys} height={cardHeight} width={cardWidth} question={question.question} answer={question.answer} points={question.points}/>)
    })
      card.push(column)
    });
    setCards(card)  
  }


return (
  <View style={styles.container}> 
    <Header windowWidth={gState.windowWidth} data={gState.data} headerWidth={cardWidth}/>
      <FlatGrid 
        spacing={0}
        itemDimension={(gState.windowWidth / gState.cols)-20}
        data={cards}
        style={styles.gridView}
        renderItem={({ item }) => (
          <View >
            {item}
          </View>
      )}/>
    <Scoreboard windowWidth={gState.windowWidth} teamNum={props.teamNum}/>
  </View>    
)}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC300',
    padding: 0,
    margin: 0,
  },
  gridView: {
    padding: 0,
    margin: 0,
  },
  button: {
    fontSize: 40,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});