import React,{useState, useEffect} from 'react'


function Mona (props){

    //const [total, setTotal] = useState([0,0,0])
    const [totalMona, setTotalMona] = useState(0)

    useEffect( ()=>{

        fetch('http://localhost:3000/dashboard/1')
        .then(
            response => {
                return response.json();
            }
        )
        .then(
            data => {
                console.log("-------Data:"+data);
                //setTotalMona(data);
                //setTotal([data.totalE,data.totalM,data.totalS])
                setTotalMona(data.totalM)
            }
        )
        }, []
    );

    /*
    const [monas, setMonas] = useState([]);

    useEffect( ()=>{

        fetch('http://localhost:3000/dashboard/1').then(
            (response) => response.json().then(console.log("----------RESPONSE:"+JSON.stringify(response)))
           // {
                //console.log("Response sin json:" + JSON. stringify(response));
               // response.json();
                //console.log("Response con json:" + JSON. stringify(response));
           // }
        ).then(
            data => {
                
                //setMonas(data);
                console.log("-------data:"+JSON.stringify(data));
        
            }
        )
        }, []
    ); */


    return(
        <div class="row featurette text-center py-md-5">
            
            <div class="col-md-5">
                <h2 class="featurette-heading">Mona</h2>
                <h3 class="text-muted font-size-4"> Cuidá la posibilidad de ahorrar</h3>
            
                <p class="lead">.</p>
            </div>
            
            <div class="col-md-7">
                 <h2 class="featuring">$ {totalMona} </h2>  
            </div> 
        </div>

    

    )
}

export default Mona; 

