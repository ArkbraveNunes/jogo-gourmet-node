import React from 'react';
import { useHistory } from 'react-router-dom'

export default function HomeDefault(){
    const history = useHistory();

    const handleSubmit = () => {
        history.push("/food-page");
    };

    return(
        <>  
        <section id="three" className="wrapper special">
                <div className="inner">
                    <form onSubmit={handleSubmit}>
                        <label>Pense em um prato que gosta
                        <input type="submit" value='OK' />
                        </label>
                    </form>
                </div>
            </section>
        </>
    )
}