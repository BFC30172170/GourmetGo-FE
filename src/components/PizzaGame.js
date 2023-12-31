import { useState, useContext, useRef, useEffect } from 'react';

import pizzabase from 'pizza-base.svg';
import pizzasauce from 'pizza-sauce.svg';
import pizzapepperoni from 'pizza-pepperoni.svg';
import pizzacheese from 'pizza-cheese.svg';
import pizzapepper from 'pizza-pepper.svg';

const PizzaGame = () => {
    const [toppings, setToppings] = useState([]);

    const addTopping = (topping,size=[20,40]) => {
        let newToppings = toppings.slice()
        console.log(size);
        newToppings.push({
            x: 45,
            y: 45,
            size: (Math.random() * size[ 1]-size[0]) + size[0],
            angle: Math.random() * 360,
            img: topping
        })
        setToppings(newToppings);
    }

    const removeTopping = () => {
        setToppings([]);
    }

    return (
        <div className='p-6'>
            Preparing your order
            <div id="pizza" className='relative rounded-full max-w-sm duration-1000'>
                {toppings.map((topping, i) => {
                    return (
                        <PizzaTopping pos={topping} />
                    )
                })}
                <img src={pizzabase} />
            </div>
            <div className='flex gap-2'>

            <img className="w-12 h-12" src={pizzasauce}
                onClick={() => { addTopping(pizzasauce,[400,500]) }}
            />

            <img className="w-12 h-12" src={pizzapepperoni} 
            onClick={() => {addTopping(pizzapepperoni,[30,50])}
            } />

            <img className="w-12 h-12" src={pizzacheese} 
            onClick={() => {addTopping(pizzacheese,[50,100])}
            } />

            <img className="w-12 h-12" src={pizzapepper} 
            onClick={() => {addTopping(pizzapepper,[50,100])}
            } />

            </div>

            <div onClick={() => removeTopping()}>X</div>
        </div>
    )
}

let maxZ = 0;

const PizzaTopping = ({ pos }) => {
    const [position,setPosition] = useState(pos);
    console.log(position);
    let pos1, pos2, pos3, pos4 = 0;
    const topping = useRef();

    const dragMouseDown = (e) => {
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        maxZ++;
        topping.current.style.zIndex = maxZ+1;
        setPosition({...position, size: topping.current.width+50})
        document.onmouseup = closeDragElement;
        document.onwheel = elementWheel;
        document.addEventListener('wheel',elementWheel,{passive:false})
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    const elementWheel = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dir = e.wheelDelta > 0 ? 'up' : 'down';
        if (dir == 'up'){
            setPosition({...position, size: topping.current.width+20})
        }else{
            setPosition({...position, size: topping.current.width-20})
        }
        
        console.log(position);
    }

    const elementDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        topping.current.style.top = topping.current.offsetTop - pos2 + "px";
        topping.current.style.left = topping.current.offsetLeft - pos1 + "px";
    }

    const closeDragElement = () => {
        /* stop moving when mouse button is released:*/
        setPosition({...position, size: topping.current.width-50})
        document.onmouseup = null;
        document.onmousemove = null;
        document.onwheel = null;
        document.removeEventListener('wheel',elementWheel);
    }
    return (
        <img draggable className="absolute w-12 h-12 origin-center duration-600" style={{ top: `${position.y}%`, left: `${position.x}%`,width:`${position.size}px`,height:`${position.size}px`,transform:`translate(-${position.size/2}px,-${position.size/2}px) rotate(${position.angle}deg)`,transitionProperty:'height,width,transform',transitionDuration:'300ms',zIndex:maxZ }} src={position.img}
            onMouseDown={(e) => { dragMouseDown(e) }}
            ref={topping}
        />
    )
}

export default PizzaGame;