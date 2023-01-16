import React, { useState, useLayoutEffect, useEffect } from 'react'
import GourmetGameService from '../services/gourmet-game-service'
import { Card } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'


const gourmetGameService = new GourmetGameService();

export default function Food(){
    const [checkFoodVisible, setterCheckFoodVisible] = useState(true)
    const [itemText, setterItemText] = useState('')
    const [itemDataType, setterDataType] = useState('TYPE')
    const [itemGroup, setterItemGroup] = useState('')
    const [positionOfListFood, setterPositionOfListFood] = useState(0)
    const [positionOfListType, setterPositionOfListType] = useState(0)

    const [registerFoodVisible, setterRegisterFoodVisible] = useState(false)
    const [registerFoodPartTwoVisible, setterRegisterFoodPartTwoVisible] = useState(false)

    const [newFoodName, setterNewFoodName] = useState('')
    const [newFoodType, setterNewFoodType] = useState('')

    useLayoutEffect(() => {
        getType()
    }, [])

    function refreshPage(){ 
        window.location.reload(); 
    }

    const changeDivVisible = (event, checkFood, registerFoodOne, registerFoodTwo) => {
        event.preventDefault();
        setterCheckFoodVisible(checkFood)
        setterRegisterFoodVisible(registerFoodOne)
        setterRegisterFoodPartTwoVisible(registerFoodTwo)
    }

    const changeOnClickValue = (event, submitValue) => {
        if (itemDataType === 'TYPE') {

            if (submitValue === true) {
                setterPositionOfListFood(0)
                getFood(itemGroup, 0)
            }
            else {
                setterPositionOfListType(positionOfListType+1)
                getType(positionOfListType+1)
                .catch(({ statusCode }) => {
                    if (statusCode === 404) {
                        getFood()
                    }
                })
            }
        }
        if (itemDataType === 'FOOD') {

            if (submitValue === true) {
                setterPositionOfListFood(0)
                setterPositionOfListType(0)
                getType(0)
                alert("Acertei a Comida");
            }
            else {
                setterPositionOfListFood(positionOfListFood+1)
                getFood(itemGroup, positionOfListFood+1)
                .catch((err) => {
                    setterCheckFoodVisible(false)
                    setterRegisterFoodVisible(true)
                    setterRegisterFoodPartTwoVisible(false)
                })
            }
        }
    }

    const getFood = async (itemGroup = 'default', skip = 0) =>  {
        await gourmetGameService.getFood({ type: itemGroup, skip })
        .then(result => {
            setterItemText(result.food)
            setterDataType('FOOD')
            setterItemGroup(itemGroup === 'default' ? itemGroup : itemGroup)
        })
    }

    const getType = async (skip = 0) =>  {
        await gourmetGameService.getType({ skip })
        .then(({ type }) => {
            setterItemText(type)
            setterItemGroup(type)
            setterDataType('TYPE')
        })
    }

    const postFood = async (foodName, foodType) => {
        await gourmetGameService.postFood({ food: foodName, type: foodType })
    }

    return(
        <>
                <section id="three" className="wrapper special" on>
                <div className="inner">
                {checkFoodVisible && itemText &&
                    <label>O prato que você pensou é {itemText}
                    <input type="button" value='SIM' onClick={(event) => changeOnClickValue(event,true)}/>
                    <input type="button" value='NAO' onClick={(event) => changeOnClickValue(event,false)}/>
                    </label>
                }
                {registerFoodVisible &&
                    <label>Qual Prato Você Pensou?
                    <input type="text" placeholder='' onChange={e => setterNewFoodName(e.target.value)}/>
                    <input type="button" value='OK' onClick={e => { changeDivVisible(e, false, false, true) }}/>
                    </label>
                }
                {registerFoodPartTwoVisible && newFoodName &&
                    <label> {newFoodName} é ________ mas {itemText} não
                    <input type="text" placeholder='' onChange={e => setterNewFoodType(e.target.value)}/>
                    <input type="button" value='OK' onClick={e => [postFood(newFoodName, newFoodType, itemGroup), refreshPage()] }/>
                    </label>
                }
                </div>
            </section>
        </>
    )
}