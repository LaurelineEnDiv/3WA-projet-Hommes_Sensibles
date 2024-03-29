import axios from "axios";
import { BASE_URL } from "../tools/constante.js";
import { Fragment, useState, useEffect } from "react";

const Pro = () => {
    const [shows, setShows] = useState([])

    useEffect(() => {
        axios.get(`${BASE_URL}/listpro`)
            .then(res => setShows(res.data.result))
    }, [])

    return (
        <Fragment>
            {!shows && (<p>loading</p>)}
            <div className="container section-margin-top pro-background-image background-image">
                <h1 className="title-white">Espace Pro</h1>
                <div className="row">
                    {shows.length > 0 && shows.map((show, i) => (
                        <div className="pro-item" key={i}>
                            <h2 className="title-yellow">{show.title}</h2>
                            {show.diff_pdf && (
                                <a href={`${BASE_URL}/pdf/${show.diff_pdf}`} target="_blank" download>
                                    <button className="button">Dossier de diffusion</button>
                                </a>
                            )}
                            {show.ft_pdf && (
                                <a href={`${BASE_URL}/pdf/${show.ft_pdf}`} target="_blank" download>
                                    <button className="button">Fiche technique</button>
                                </a>
                            )}
                        </div>
                    ))}
                    
                </div>
            </div>
        </Fragment>
    )
}

export default Pro