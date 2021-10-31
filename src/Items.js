import React from 'react'
import Item from './Item'
function Items(props) {
    
    return (
        <div className="container">
            <div className='row'>
                
                {props.filesList.map((item)=>(<Item key={item.ext} item={item}></Item>))} 
                
            </div>
        </div>
    )
}

export default Items
