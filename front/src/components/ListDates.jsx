import axios from "axios";
import { BASE_URL } from "../tools/constante.js"
import { useState, useEffect, Fragment } from "react";

const ListDates = () => {
    const [dates, setDates] = useState([])
    const [selectedYear, setSelectedYear] = useState(2023); // année par défaut
    const [datesByMonth, setDatesByMonth] = useState({});
    
    useEffect(() => {
        axios.get(`${BASE_URL}/listdates`)
            .then(res => {
                // Filtrer les dates en fonction de l'année sélectionnée
                const filteredDates = res.data.result.filter(
                    (date) => new Date(date.date).getFullYear() === selectedYear
                );
                
                // Grouper les dates par mois
                const datesByMonth = filteredDates.reduce((acc, date) => {
                    const month = new Date(date.date).getMonth();
                        if (!acc[month]) {
                            acc[month] = [];
                        }
                    acc[month].push(date);
                    return acc;
                }, {});
                
                // Trier les dates par titre de spectacle pour chaque mois
            const sortedDatesByMonth = Object.entries(datesByMonth).map(([month, dates]) => {
                dates.sort((a, b) => a.title.localeCompare(b.title));
                return [month, dates];
            });
            
            // Mettre à jour le state avec les dates triées
            const updatedDatesByMonth = Object.fromEntries(sortedDatesByMonth);
                
                setDatesByMonth(datesByMonth);
                setDates(filteredDates);
            })
            .catch(e => console.log(e))
    }, [selectedYear])

    // Fonction pour changer l'année sélectionnée
    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    return (
        <Fragment>
        {!dates && (<p>loading</p>) }
        <div className=" background-image dates-background-image container section-margin-top">
        <h1>Agenda</h1>
            <div className="year-filter">
                <button className="button" onClick={() => handleYearChange(2021)}>2021</button>
                <button className="button" onClick={() => handleYearChange(2022)}>2022</button>
                <button className="button" onClick={() => handleYearChange(2023)}>2023</button>
            </div>
            <section className="column">
            {/*{dates.length > 0 && dates.map((date, i) => {
                return(*/}
                    {Object.entries(datesByMonth).map(([month, dates]) => (
          <Fragment key={month}>
            <h2>{new Date(dates[0].date).toLocaleString('default', { month: 'long' })}</h2>
            {dates.reduce((acc, date) => {
              const existingShow = acc.find(show => show.title === date.title);
              if (existingShow) {
                existingShow.dates.push(date);
              } else {
                acc.push({ title: date.title, dates: [date] });
              }
              return acc;
            }, []).map(show => (
              <Fragment key={show.title}>
                <h3>{show.title}</h3>
                {show.dates.map((date, i) => (
                  <div className="full-width" key={i}>
                    <p>{date.formattedDate} <a href={date.site_web} target="_blank">{date.nom_lieu} </a>
                      - {date.ville} ({date.departement})</p>
                  </div>
                ))}
              </Fragment>
            ))}
          </Fragment>
        ))}
            </section>     
        </div>
        </Fragment>
    )
}

export default ListDates