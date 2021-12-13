// Write your code here
const mainSection = document.querySelector('main')
const selectStateForm = document.querySelector('#select-state-form')
const filterSection = document.querySelector('.filters-section')
const ulEl = document.querySelector('.breweries-list')
const searchForm = document.querySelector('#search-breweries-form')



state = {
  breweries: [],
  selectedState: null,
  breweryTypes: ['micro', 'regional', 'brewpub'],
  selectedBreweryType: '',
  selectedCities: [],
  search: ''
}


/* <aside class="filters-section">
  <h2>Filter By:</h2>
  <form id="filter-by-type-form" autocompete="off">
    <label for="filter-by-type"><h3>Type of Brewery</h3></label>
    <select name="filter-by-type" id="filter-by-type">
      <option value="">Select a type...</option>
      <option value="micro">Micro</option>
      <option value="regional">Regional</option>
      <option value="brewpub">Brewpub</option>
    </select>
  </form>
  <div class="filter-by-city-heading">
    <h3>Cities</h3>
    <button class="clear-all-btn">clear all</button>
  </div>
  <form id="filter-by-city-form">
    <input type="checkbox" name="chardon" value="chardon" /><label for="chardon"
      >Chardon</label
    ><input type="checkbox" name="cincinnati" value="cincinnati" /><label
      for="cincinnati"
      >Cincinnati</label
    >
    // More checkboxes
  </form>
</aside> */




function getBreweries() {
  return fetch('https://api.openbrewerydb.org/breweries').then(resp => resp.json()) // Promise<Breweries>
}



function getBreweriesToDisplay() {
  let breweriesToDisplay = state.breweries

  breweriesToDisplay = breweriesToDisplay.filter(brewery =>
    state.breweryTypes.includes(brewery.brewery_type)
  )

  breweriesToDisplay = breweriesToDisplay.slice(0, 10)

  return breweriesToDisplay
}

// function updateBreweriesOnServer(brewerie) {
//   return fetch(`https://api.openbrewerydb.org/breweries/${brewerie.id}`, {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(brewerie)
//   }).then(resp => resp.json())
// }


function fetchBreweriesByState(state) {
  return fetch(`https://api.openbrewerydb.org/breweries?by_state=${state}&per_page=50`).then(resp =>
    resp.json()
  )
}

function fetchBreweriesByType(bytype, state) {
  return fetch(`https://api.openbrewerydb.org/breweries?by_type=${bytype}&by_state=${state}`).then(resp =>
    resp.json()
  )
}

function listenToSelectStateForm() {
  selectStateForm.addEventListener('submit', function (event) {
    event.preventDefault()
    state.selectedState = selectStateForm['select-state'].value

    fetchBreweriesByState(state.selectedState) // Promise<breweries>
      .then(function (breweries) {
        state.breweries = breweries
        state.selectedCities = []
        state.selectedBreweryType = ''
        state.search = ''
        render()
      })
  })
}

function listenToSearchInput () {
  searchForm.addEventListener('submit', function (event) {
    event.preventDefault()

    // update state
    state.search = searchForm.search.value
    // render
    render()
  })
}



function getCitiesFromBreweries(breweries) {
  let cities = []

  for (const brewery of breweries) {
    if (!cities.includes(brewery.city)) {
      cities.push(brewery.city)
    }
  }

  return cities
}


function getBreweriesToDisplay() {
  let breweriesToDisplay = state.breweries

  breweriesToDisplay = breweriesToDisplay.filter(brewery =>
    state.breweryTypes.includes(brewery.brewery_type)
  )

  if (state.selectedBreweryType !== '') {
    breweriesToDisplay = breweriesToDisplay.filter(
      brewery => brewery.brewery_type === state.selectedBreweryType
    )
  }

  if (state.selectedCities.length > 0) {
    breweriesToDisplay = breweriesToDisplay.filter(brewery =>
      state.selectedCities.includes(brewery.city)
    )
  }

  breweriesToDisplay = breweriesToDisplay.filter(brewery =>
    brewery.name.toLowerCase().includes(state.search.toLowerCase())
  )

  breweriesToDisplay = breweriesToDisplay.slice(0, 10)

  return breweriesToDisplay
}

function renderFilterSection() {

  filterSection.innerHTML = ''

  const h2El = document.createElement('h2')
  h2El.textContent = "Filter By:"

  const formType = document.createElement('form')
  formType.setAttribute('id', 'filter-by-type-form')
  formType.setAttribute('autocompete', 'off')

  const labelFilter = document.createElement('label')
  labelFilter.setAttribute('for', 'filter-by-type')
  const h3El = document.createElement('h3')
  h3El.textContent = "Type of Brewery"
  labelFilter.append(h3El)

  const selectFilter = document.createElement('select')
  selectFilter.setAttribute('class', 'filter-by-type')
  selectFilter.setAttribute('id', 'filter-by-type')
  formType.append(labelFilter, selectFilter)

  const optionSelect = document.createElement('option')
  optionSelect.setAttribute('value', ' ')
  optionSelect.textContent = "Select a type..."

  for (const breweryType of state.breweryTypes) {

    const optionMicro = document.createElement('option')
    optionMicro.setAttribute('value', breweryType)
    optionMicro.textContent = breweryType.toUpperCase()

    selectFilter.append(optionSelect, optionMicro)


  }

  selectFilter.addEventListener("change", function () {
    state.selectedBreweryType = selectFilter.value
    fetchBreweriesByType(state.selectedBreweryType, state.selectedState)
      .then(function (brewerys) {
        state.breweries = brewerys
        render()
      })

  })


  const divEl = document.createElement('div')
  divEl.setAttribute('class', 'filter-by-city-heading')

  const h3Cities = document.createElement('h3')
  h3Cities.textContent = "Cities"

  const btnClear = document.createElement('button')
  btnClear.setAttribute('class', 'clear-all-btn')
  btnClear.textContent = "clear all"
  divEl.append(h3Cities, btnClear)

  const formCity = document.createElement('form')
  formCity.setAttribute('id', 'filter-by-city-form')

  const cities = getCitiesFromBreweries(state.breweries)

  for (const city of cities) {

    const inputEl = document.createElement('input')
    inputEl.setAttribute('class', 'city-checkbox')
    inputEl.setAttribute('type', 'checkbox')
    inputEl.setAttribute('name', city)
    inputEl.setAttribute('value', city)
    inputEl.setAttribute('id', city)

    if (state.selectedCities.includes(city)) inputEl.checked = true

    const label = document.createElement('label')
    label.setAttribute('for', city)
    label.textContent = city

    inputEl.addEventListener('change', function () {

      const cityCheckboxes = document.querySelectorAll('.city-checkbox')
      let selectedCities = []
      for (const checkbox of cityCheckboxes) {
        if (checkbox.checked) selectedCities.push(checkbox.value)
      }
      state.selectedCities = selectedCities
      render()
    })


    formCity.append(inputEl, label)
  }

  filterSection.append(h2El, formType, divEl, formCity)

}


// function renderSearchInput() {
//   searchForm.search.value = state.search
// }


function renderList() {

  ulEl.innerHTML = ''

  const breweriesToDisplay = getBreweriesToDisplay()

  for (const brewery of breweriesToDisplay) {

    const liElement = document.createElement('li')

    const h2Element = document.createElement('h2')
    h2Element.textContent = brewery.name


    const divElement = document.createElement('div')
    divElement.setAttribute('class', 'type')
    divElement.textContent = brewery.brewery_type


    const sectionAddress = document.createElement('section')
    sectionAddress.setAttribute('class', 'address')
    const h3Element = document.createElement('h3')
    h3Element.textContent = "Address:"

    const p1Address = document.createElement('p')
    p1Address.textContent = brewery.street

    const p2Address = document.createElement('p')
    const strAddress = document.createElement('strong')
    strAddress.textContent = `${brewery.city}, ${brewery.postal_code}`
    p2Address.append(strAddress)
    sectionAddress.append(h3Element, p1Address, p2Address)

    const sectionPhone = document.createElement('section')
    sectionPhone.setAttribute('class', 'phone')
    const h3ElPhone = document.createElement('h3')
    h3ElPhone.textContent = "Phone:"
    const pElPhone = document.createElement('p')
    pElPhone.textContent = brewery.phone
    sectionPhone.append(h3ElPhone, pElPhone)


    const sectionLink = document.createElement('section')
    sectionLink.setAttribute('class', 'link')
    const aElWebsite = document.createElement('a')
    aElWebsite.setAttribute('href', brewery.website_url)
    aElWebsite.setAttribute('target', '_blank')
    aElWebsite.textContent = "Visit Website"
    sectionLink.append(aElWebsite)


    liElement.append(h2Element, divElement, sectionAddress, sectionPhone, sectionLink)

    ulEl.append(liElement)
  }

}

function render() {
  renderFilterSection()
  renderList()
  // renderSearchInput()
}

function init() {
  render()
  listenToSelectStateForm()
  listenToSearchInput()
}

init()