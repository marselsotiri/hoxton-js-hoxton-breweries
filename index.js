// Write your code here
const mainSection = document.querySelector('main')

state = {

}

/* <main>
  <aside class="filters-section">
    // Check filter-section.html
  </aside>
  // Check list-section.html
</main> */

const filterSection = document.createElement('aside')
filterSection.setAttribute('class', 'filters-section')
mainSection.append(filterSection)


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


const h2El = document.createElement('h2')
h2El.textContent = "Filter By:"

const formType = document.createElement('form')
formType.setAttribute('class', 'filter-by-type-form')
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

const optionMicro = document.createElement('option')
optionMicro.setAttribute('value', 'micro')
optionMicro.textContent = "Micro"

const optionRegional = document.createElement('option')
optionRegional.setAttribute('value', 'regional')
optionRegional.textContent = "Regional"

const optionBrewpub = document.createElement('option')
optionBrewpub.setAttribute('value', 'brewpub')
optionBrewpub.textContent = "Brewpub"

selectFilter.append(optionSelect, optionMicro, optionRegional, optionBrewpub)




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


const inputElChardon = document.createElement('input')
inputElChardon.setAttribute('type', 'checkbox')
inputElChardon.setAttribute('name', 'chardon')
inputElChardon.setAttribute('value', 'chardon')

const labelChardon = document.createElement('label')
labelChardon.setAttribute('for', 'chardon')
labelChardon.textContent = "Chardon"


const inputElCincinnati = document.createElement('input')
inputElCincinnati.setAttribute('type', 'checkbox')
inputElCincinnati.setAttribute('name', 'cincinnati')
inputElCincinnati.setAttribute('value', 'cincinnati')

const labelCincinnati = document.createElement('label')
labelCincinnati.setAttribute('for', 'cincinnati')
labelCincinnati.textContent = "Cincinnati"


formCity.append(inputElChardon,labelChardon, inputElCincinnati,labelCincinnati)

filterSection.append(h2El, formType, divEl, formCity)




/* <h1>List of Breweries</h1>
<header class="search-bar">
  <form id="search-breweries-form" autocomplete="off">
    <label for="search-breweries"><h2>Search breweries:</h2></label>
    <input id="search-breweries" name="search-breweries" type="text" />
  </form>
</header>
<article>
  <ul class="breweries-list">
    <li>
      <h2>Snow Belt Brew</h2>
      <div class="type">micro</div>
      <section class="address">
        <h3>Address:</h3>
        <p>9511 Kile Rd</p>
        <p><strong>Chardon, 44024</strong></p>
      </section>
      <section class="phone">
        <h3>Phone:</h3>
        <p>N/A</p>
      </section>
      <section class="link">
        <a href="null" target="_blank">Visit Website</a>
      </section>
    </li>
    // More list elements
  </ul>
</article> */

const h1Breweries = document.createElement('h1')
h1Breweries.textContent = "List of Breweries"

const headerEl = document.createElement('header')
headerEl.setAttribute('class', 'search-bar')

const formSearchBreweries = document.createElement('form')
formSearchBreweries.setAttribute('id', 'search-breweries-form')
formSearchBreweries.setAttribute('autocomplete', 'off')

const labelSearchBreweries = document.createElement('label')
labelSearchBreweries.setAttribute('for', 'search-breweries')
const h2Breweries = document.createElement('h2')
h2Breweries.textContent = "Search breweries:"
labelSearchBreweries.append(h2Breweries)


const inputSerchBreweries = document.createElement('input')
inputSerchBreweries.setAttribute('id', 'search-breweries')
inputSerchBreweries.setAttribute('name', 'search-breweries')
inputSerchBreweries.setAttribute('type', 'text')

formSearchBreweries.append(labelSearchBreweries, inputSerchBreweries)

headerEl.append(formSearchBreweries)

const articleBreweries = document.createElement('article')

const ulEl = document.createElement('ul')
ulEl.setAttribute('class', 'breweries-list')

const liElement = document.createElement('li')

const h2Element = document.createElement('h2')
h2Element.textContent = "Snow Belt Brew"


const divElement = document.createElement('div')
divElement.setAttribute('class', 'type')
divElement.textContent = "micro"


const sectionAddress = document.createElement('section')
sectionAddress.setAttribute('class', 'address')
const h3Element = document.createElement('h3')
h3Element.textContent = "Address:"

const p1Address = document.createElement('p')
p1Address.textContent = "9511 Kile Rd"

const p2Address = document.createElement('p')
const strAddress = document.createElement('strong')
strAddress.textContent = "Chardon, 44024"
p2Address.append(strAddress)
sectionAddress.append(h3Element, p1Address, p2Address)

const sectionPhone = document.createElement('section')
sectionPhone.setAttribute('class', 'phone')
const h3ElPhone = document.createElement('h3')
h3ElPhone.textContent = "Phone:"
const pElPhone = document.createElement('p')
pElPhone.textContent = "N/A"
sectionPhone.append(h3ElPhone, pElPhone)


const sectionLink = document.createElement('section')
sectionLink.setAttribute('class', 'link')
const aElWebsite = document.createElement('a')
aElWebsite.setAttribute('href', 'null')
aElWebsite.setAttribute('target', '_blank')
aElWebsite.textContent = "Visit Website"
sectionLink.append(aElWebsite)


liElement.append(h2Element, divElement, sectionAddress, sectionPhone, sectionLink)

ulEl.append(liElement)

articleBreweries.append(ulEl)

mainSection.append(h1Breweries, headerEl, articleBreweries)