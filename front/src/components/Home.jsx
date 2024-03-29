import { Fragment, useState, useEffect } from 'react';
import axios from "axios";
import { BASE_URL, BASE_IMG } from "../tools/constante.js"
import { NavLink } from "react-router-dom"
import video from "../assets/video/bateau.webm";
import baleine from "../assets/img/baleine.png";


const Home = () => {
    const [text, setText] = useState([])
    const [shows, setShows] = useState([])
    const [dates, setDates] = useState([])

    
    useEffect(() => {
        axios.get(`${BASE_URL}/hometext`)
            .then(res => setText(res.data.result))
    }, [])
    
    
    useEffect(() => {
        axios.get(`${BASE_URL}/listshows`)
            .then(res => setShows(res.data.result))
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        axios.get(`${BASE_URL}/listdates`)
            .then(res => {
                const today = new Date()
                const data = res.data.result
                    .filter(date => new Date(date.date) > today) // filtrer les dates futures
                    .sort((a, b) => new Date(a.date) - new Date(b.date)) // trier par date croissante
                    .slice(0, 3) // récupérer les trois premières dates
                setDates(data)
            })
            .catch(e => console.log(e))
    }, [])

    return (
        <Fragment>
        <section className="section-margin-top">
            <video className="full-width" loop autoPlay muted>
                <source src={video}/>
            </video>
         </section>
         <div className="container">
         {text.length > 0 && text.map((item, i) => (
            <div key={i}>
                <h1>{item.titre}</h1>
                    <div className="text-description">
                        <img src={baleine} className="img-baleine"/>
                        <p>{item.text1}</p>
                    </div>
            </div>
            ))}    
                    
                    <NavLink to={`/la-compagnie`}><button className="button">Tout sur la compagnie</button></NavLink>
                    
         </div>
            <section className="background-image home-background-image">
            {!shows && (<p>loading</p>) }
            <div className="container">
                <h2 className="title-white">Les Spectacles</h2>
                <div className="tab-row">
                {shows.length > 0 && shows.map((show, i) => {
                    if (show.image_selected === 1) {
                    return(
                        <div className="show-item background-white" key={i}>
                        <NavLink to={`/show/${show.id}`}>
                            <img src={`${BASE_IMG}/${show.url_pictures}`} alt={`${show.title}`}/>
                            <div className="item-caption">
                            <h3>{show.title}</h3>
                            <p className="pitch">{show.pitch}</p>
                            </div>
                        </NavLink>
                        </div>
                    )
                    }
                })}
                </div>
                </div>
            </section>
       
        
            <div className="background-black container">
            <h2>Agenda</h2>
            {dates.length > 0 && dates.map((date, i) => {
                    return(
                    <div className="list-dates column">
                        <div className="date-item full-width" key={i}>
                            <p className="date">{date.formattedDate}</p>
                            <h3>{date.title}</h3>
                            <p><a href={date.site_web} target="_blank">{date.nom_lieu}</a> à {date.ville} ({date.departement})</p>
                        </div>
                    </div>
                        
                    )
                })}
                <NavLink to={`/agenda`}><button className="button">Voir toutes les dates</button></NavLink>
            </div>
       
        </Fragment>
    )
}

export default Home