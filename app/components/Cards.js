import * as audio from './audio';
import image from "../assets/img/react.svg"
import {React, useState, createRef} from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions  } from "react-native";


export default function Card(props) {
    const [cardState, setCardState] = useState({view: 'points', completed: false})
    const cardRef = createRef(null)
    const { height, width } = useWindowDimensions();
    
    const handleClick= () => {
        console.log("card Pressed");
   
        if (cardState.view === 'points') {
            audio.play("flip");
            setTimeout(() => {
                if (cardState.view === "question") {
                    audio.play("countdown");
                }
            }, 1800);
            cardState.view = 'question'
            cardState.flipping = true
            // setCardState({view: 'question', flipping: true});
        } 
        else if (cardState.view === 'question') {
            audio.stop("countdown");
            cardState.view = 'answer'
            // setCardState({view: 'answer'});
        } else {
            audio.play("flipBack");
            cardState.view = 'points'
            cardState.flipping = true
            cardState.completed =true
            // setCardState({view: 'points', completed: true, flipping: true});
        }
    };

    let getLabelBack = () => {
        let label = cardState.view === 'question' ? <Text>{props.question}</Text> : <Text>{props.answer}</Text>
        return label;
    }

    let transitionEndHandler = (e) => {
        if (e.propertyName === 'width') {
            cardState.flipping = false
            // setCardState({flipping: false});
        }
    }
    console.log(props)
 let style = {width: props.width, 
                height: props.height, 
    transform:[{translateX:props.left}, {translateY:props.top}]}
  
     

        let front = cardState.completed ? <img src={image}/> : <Text style= {{fontSize: 30, flexDirection: "row"}} className='points'>{props.points}</Text>;
        let className = 'flipper';

        if (cardState.view !== 'points') {
            className = className + ' flipped';
        }
        if (cardState.flipping) {
            className = className + ' flipping';
        }
        //
        return (
            <TouchableOpacity  style= {{width: props.width,  height: props.height}} className={className} onPress={handleClick}>
                <div className='card'>
                    <View className='front'>
                    {front}
                    </View>
                    <View className='back'>
                        {getLabelBack}
                        <img src={image}/>
                    </View>
                </div>

            </TouchableOpacity>

        );
    }


    // const styles = StyleSheet.create({ 
    //     container: {
    //         flex:1,
    //     width: props.width ,
    //     height: props.height,
    //     transform: 'translate3d(' + props.left + 'px,' + props.top + 'px,0)',
    //     WebkitTransform: 'translate3d(' + props.left + 'px,' + props.top + 'px,0)'
    // }});