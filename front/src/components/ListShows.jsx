import axios from "axios";
import { NavLink } from "react-router-dom"
import { BASE_URL, BASE_IMG } from "../tools/constante.js"
import { Fragment, useState, useEffect } from "react";

const ListShows = () => {
    const [shows, setShows] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/listshows`)
            .then(res => setShows(res.data.result))
            .catch(e => console.log(e))
    }, [])

    return (
        <Fragment>
        {!shows && (<p>loading</p>) }
        <section className="background-image shows-background-image">
        <div className="container section-margin-top">
        <h1 className="title-white">Nos Projets</h1>
        <div className="tab-row">
            {shows.length > 0 && shows.map((show, i) => {
                if (show.image_selected === 1) {
                return(
                    <div className="show-item background-white" key={i}>
                        <NavLink to={`/show/${show.id}`}>
                        <img src={`${BASE_IMG}/${show.url_pictures}`} alt={`${show.title}`} />
                        <div className="item-caption">
                            <h3 className="text-shadow">{show.title}</h3>
                            <p className="pitch">{show.pitch}</p>
                        </div>
                        </NavLink>
                    </div>
                )
            }})}
        </div>  
        </div>
        </section>
       </Fragment>
    )
}

export default ListShows
