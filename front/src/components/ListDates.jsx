import axios from "axios";
import {BASE_URL} from "../tools/constante.js"
import {useState, useEffect} from "react";

const ListDates = () => {
    const [dates, setDates] = useState([])
    const [selectedYear, setSelectedYear] = useState(2023); // année par défaut
    
    useEffect(() => {
        axios.get(`${BASE_URL}/listdates`)
        .then(res =>  {
        // Filtrer les dates en fonction de l'année sélectionnée
        const filteredDates = res.data.result.filter(
          (date) => new Date(date.date).getFullYear() === selectedYear
        );
        
        setDates(filteredDates);
      })
        .catch(e => console.log(e))
    },[selectedYear]) // cette fonction sera appelée à chaque fois que l'année sélectionnée change
    
    // Fonction pour changer l'année sélectionnée
  const handleYearChange = (year) => {
    setSelectedYear(year);
  };
    
    return (
        <div className="background-image dates-background-image container section-margin-top">
        <h1 className="title-white">Agenda</h1>
            <div className="year-filter">
                <button className="button-white" onClick={() => handleYearChange(2023)}>2023</button>
                <button className="button-white" onClick={() => handleYearChange(2022)}>2022</button>
                <button className="button-white" onClick={() => handleYearChange(2021)}>2021</button>
            </div>
            <section className="column">
            {dates.length > 0 && dates.map((date, i) => {
                return(
                    <div className="date-item full-width background-lightgrey" key={i}>
                        <h2 className="date">{date.formattedDate}</h2>
                        <h3>
                        <span>{date.title}</span>
                        <p className="date-lieu"><a href={date.site_web} target="_blank">{date.nom_lieu} </a>
                         - {date.ville} ({date.departement})</p>
                        </h3>
                    </div>
                )
            })}
            </section>     
        </div> 
    )
}

export default ListDates