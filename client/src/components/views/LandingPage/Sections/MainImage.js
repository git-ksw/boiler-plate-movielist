import React from "react"
export default function MainImage (props){

    return(
        <div style={{
            background:`url('${props.MainImage}'),#1c1c1c`,
            height:'500px',
            backgroundSize:'100%,cover',
            backgroundPosition:'center,center',
            width:'100%',
            position:'relative'
        }}>
            <div>
                <div>
                    <h2>
                        <p>
                            ddd
                        </p>
                    </h2>
                </div>
            </div>
        </div>
    )
}