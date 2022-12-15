const driversEl = document.getElementById('cars')
const featuredEmployeeEl = document.getElementById('featuredEmployee')


const featuredEmployeeBuilder = function(name, jobTitle, skills) {
    let skillHTML = ''
    
    for (const skill in skills) {
        console.log(skill, skills[skill])
        skillHTML += `
        <li class="list-group-item">
            <strong>${skill}:</strong> ${skills[skill]}
        </li>
                `
    }

    // console.log(skillHTML)

    featuredEmployeeEl.innerHTML = `
        <div class="card">
            <div class="card-header">
                <h2>${name}</h2>
                <p>${jobTitle}</p>
            </div>
            <ul class="list-group list-group-flush">
                ${skillHTML}
            </ul>
        </div>

        `
}

// /* Fetch API */
const getData = () => {
    axios.get('https://ergast.com/api/f1/2010/2/driverStandings.json')
        .then(response => {
            console.log(response)
            driversEl.innerHTML = ''
            // console.log(response['MRData']['limit'])
            for ( let i = 0; i < 7; i++) {
                let driver = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i]

                let position = driver.position
                let name = driver.Driver.givenName + driver.Driver.familyName
                let nationality = driver.Driver.nationality
                let sponsor = driver.Constructors[0].name
                let points = driver.points
                addDriver(position, name, nationality, sponsor, points)
                }
        })
        .catch(err => {
            console.log(err, err.response)
        })
};

const getDatabyYear = (year, position) => {
    axios.get(`https://ergast.com/api/f1/${year}/2/driverStandings.json`)
        .then(response => {
            console.log(response)
            driversEl.innerHTML = ''
            console.log(position)
            const listEnd = parseInt(position) + 6
            console.log(listEnd)
            console.log(position)
            for ( let i = position -1; i < listEnd; i++) {
                let driver = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[i]

                let driverPosition = driver.position
                let name = driver.Driver.givenName + driver.Driver.familyName
                let nationality = driver.Driver.nationality
                let sponsor = driver.Constructors[0].name
                let points = driver.points
                addDriver(driverPosition, name, nationality, sponsor, points)
                }
        })
        .catch(err => {
            console.log(err, err.response)
        })
};


getData()

// let drivers = []

function addDriver(position, name, nationality, sponsor, points) {
    const driverEl = document.createElement('div')
    
    driverEl.classList.add('card', 'mb-0')

    driverEl.innerHTML = `
    <div class="d-flex entry">
    <div class="category-box"> <h3>${position}</h3>
    </div>
    <div class="category-box"> <h3>${name}</h3></div>
    <div class="category-box"><h3>${nationality}</h3></div>
    <div class="category-box"><h3>${sponsor}</h3></div>
    <div class="category-box"><h3>${points}</h3></div>
</div>
    `

    driverEl.addEventListener('click', (e) => {
        // featuredEmployeeBuilder(name, jobTitle, skills)
        // let oldFeature = document.querySelector('#employees .depressed')
        // console.log(oldFeature)
        // oldFeature?.classList.remove('depressed')
        // driverEl.classList.add('depressed')
    })

    driversEl.appendChild(driverEl)
}

const formEl = document.getElementById('input-form')
formEl.addEventListener('submit', (e) => {
    event.preventDefault() // Prevents refresh

    let yearInput = document.getElementsByName('year')[0]
   
    let positionInput = document.getElementsByName('position')[0]
    

    getDatabyYear(yearInput.value, positionInput.value)

    yearInput.value = ''
    positionInput.value = ''
})