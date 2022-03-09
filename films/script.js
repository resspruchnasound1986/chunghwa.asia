let tbody = document.querySelector('.film-table')
let last_director = ''

fetch(JSON_URL)
    .then(res => res.json())
    .then(data => data.sort((x, y) => {
        if (x.director == y.director) {
            return x.year < y.year ? -1 : 1
        }

        return x.director < y.director ? -1 : 1
    }))
    .then(data => 
        data.forEach(film => {
            let tr = document.createElement('tr')

            let year = document.createElement('td')
            year.innerText = film.year
            tr.appendChild(year)
            
            let title = document.createElement('td')
            title.innerText = film.title
            tr.appendChild(title)

            let director_td = document.createElement('td')
            let director = film.director.split(' [')[0]
            
            if (director === last_director) {
                director_td.innerText = '"'
            } else {
                director_td.innerText = director
                last_director = director
            }
            tr.appendChild(director_td)

            if (film.not_yet) { tr.classList.add('not-yet') }


            tbody.appendChild(tr)

            document.body.style.background = 'var(--theme-gradient)'
        })
    )

