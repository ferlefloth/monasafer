import React,{useState, useEffect} from 'react'

function Gastos(){

    const [totalMona, setTotalMona] = useState(0)

    useEffect( ()=>{

        fetch('http://localhost:3000/dashboard/1').then(
            response => response.json()
            
            )
        .then(
             data => {
                console.log("-------Data:"+JSON.stringify(data));
                //setTotalMona(data);
                //setTotal([data.totalE,data.totalM,data.totalS])
                setTotalMona(data.totalE)
            }
        )
        }, []
    );
    
    return(
    <>
        <div id ="gastoindex" className="row featurette text-center py-md-5">
            
            <div class="col-md-5">
                <h2 class="featurette-heading">Gastos</h2>
                <h3 class="text-muted font-size-4"> Gastos Variables y Fijos de este mes</h3>
                <p class="lead">.</p>
            </div>
            
            <div class="col-md-7">
                 <h2 class="featuring">$ {totalMona} </h2>  
            
            </div>
        </div>
    </>
    )
}

export default Gastos;